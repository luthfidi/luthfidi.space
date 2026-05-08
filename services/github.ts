import axios from "axios";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";
import { unstable_cache } from "next/cache";

const GITHUB_USER_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_USER_QUERY = `query($username: String!, $from: DateTime, $to: DateTime) {
  user(login: $username) {
    createdAt
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
    topRepos: repositories(
      first: 100
      ownerAffiliations: OWNER
      isFork: false
      orderBy: { field: STARGAZERS, direction: DESC }
    ) {
      nodes {
        primaryLanguage {
          name
          color
        }
      }
    }
  }
}`;

const fetchGithubData = async (
  username: string,
  token: string,
  year: number | null,
) => {
  try {
    // When year is null, omit from/to so GitHub returns its rolling
    // 12-month default ending today (today on the rightmost cell).
    const from = year ? `${year}-01-01T00:00:00Z` : null;
    const to = year ? `${year}-12-31T23:59:59Z` : null;

    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: { username, from, to },
      },
      {
        headers: { Authorization: `bearer ${token}` },
      },
    );

    return response.data.data.user;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
};

const getCachedGithubData = unstable_cache(
  async (username: string, token: string, year: number | null) =>
    fetchGithubData(username, token, year),
  ["github-stats-cache-key"],
  {
    revalidate: 3600,
    tags: ["github-stats-tag"],
  },
);

// Build a single GraphQL query with one alias per year so we can fetch
// up to 10 years of contribution data in a single request, then aggregate
// for an all-time longest/current streak that doesn't reset when the user
// switches the year selector.
const buildLifetimeQuery = (years: number[]) => {
  const aliases = years
    .map(
      (year) => `y${year}: contributionsCollection(
      from: "${year}-01-01T00:00:00Z"
      to: "${year}-12-31T23:59:59Z"
    ) {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }`,
    )
    .join("\n    ");

  return `query($username: String!) {
    user(login: $username) {
      createdAt
      ${aliases}
    }
  }`;
};

interface StreakStats {
  current: number;
  longest: number;
  currentStart: string | null;
  currentEnd: string | null;
  longestStart: string | null;
  longestEnd: string | null;
}

const computeStreaks = (
  days: { date: string; count: number }[],
): StreakStats => {
  const empty: StreakStats = {
    current: 0,
    longest: 0,
    currentStart: null,
    currentEnd: null,
    longestStart: null,
    longestEnd: null,
  };
  if (days.length === 0) return empty;

  const today = new Date().toISOString().slice(0, 10);

  // Dedup + drop FUTURE dates (GitHub pads the calendar to the end of the
  // ISO week with count 0, which would otherwise break the walk-back).
  const dedup = new Map<string, number>();
  for (const d of days) {
    if (d.date <= today) dedup.set(d.date, d.count);
  }
  const sorted = Array.from(dedup.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Longest streak with its start/end dates.
  let longest = 0;
  let longestStart: string | null = null;
  let longestEnd: string | null = null;
  let running = 0;
  let runStart: string | null = null;
  for (const d of sorted) {
    if (d.count > 0) {
      if (running === 0) runStart = d.date;
      running += 1;
      if (running > longest) {
        longest = running;
        longestStart = runStart;
        longestEnd = d.date;
      }
    } else {
      running = 0;
    }
  }

  // Current streak: walk back from the latest day, skipping today if zero.
  let current = 0;
  let i = sorted.length - 1;
  if (i >= 0 && sorted[i].date === today && sorted[i].count === 0) i -= 1;
  const endIdx = i;
  for (; i >= 0; i -= 1) {
    if (sorted[i].count > 0) current += 1;
    else break;
  }
  const startIdx = i + 1;

  const currentStart =
    current > 0 && startIdx >= 0 && startIdx < sorted.length
      ? sorted[startIdx].date
      : null;
  const currentEnd =
    current > 0 && endIdx >= 0 && endIdx < sorted.length
      ? sorted[endIdx].date
      : null;

  return {
    current,
    longest,
    currentStart,
    currentEnd,
    longestStart,
    longestEnd,
  };
};

const EMPTY_STREAKS: StreakStats = {
  current: 0,
  longest: 0,
  currentStart: null,
  currentEnd: null,
  longestStart: null,
  longestEnd: null,
};

const fetchLifetimeStreaks = async (
  username: string,
  token: string,
): Promise<StreakStats> => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 9; y -= 1) years.push(y);

  try {
    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: buildLifetimeQuery(years),
        variables: { username },
      },
      {
        headers: { Authorization: `bearer ${token}` },
      },
    );

    const data = response.data?.data?.user;
    if (!data) return EMPTY_STREAKS;

    const allDays: { date: string; count: number }[] = [];
    for (const year of years) {
      const yearData = data[`y${year}`];
      const weeks = yearData?.contributionCalendar?.weeks ?? [];
      for (const week of weeks) {
        for (const day of week.contributionDays ?? []) {
          allDays.push({ date: day.date, count: day.contributionCount });
        }
      }
    }

    return computeStreaks(allDays);
  } catch (error) {
    console.error("GitHub lifetime streaks error:", error);
    return EMPTY_STREAKS;
  }
};

const getCachedLifetimeStreaks = unstable_cache(
  async (username: string, token: string) =>
    fetchLifetimeStreaks(username, token),
  ["github-lifetime-streaks-cache-v2"],
  {
    revalidate: 3600,
    tags: ["github-stats-tag"],
  },
);

export const getGithubData = async (year?: number) => {
  const { username, token } = GITHUB_ACCOUNTS;

  if (!username || !token) {
    return { status: 500, data: null };
  }

  const [data, lifetimeStreaks] = await Promise.all([
    getCachedGithubData(username, token, year ?? null),
    getCachedLifetimeStreaks(username, token),
  ]);

  if (!data) {
    return { status: 502, data: null };
  }

  return { status: 200, data: { ...data, lifetimeStreaks } };
};
