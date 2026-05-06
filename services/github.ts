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

export const getGithubData = async (year?: number) => {
  const { username, token } = GITHUB_ACCOUNTS;

  if (!username || !token) {
    return { status: 500, data: null };
  }

  const data = await getCachedGithubData(username, token, year ?? null);

  if (!data) {
    return { status: 502, data: null };
  }

  return { status: 200, data };
};
