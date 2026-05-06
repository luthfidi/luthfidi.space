import { NextRequest, NextResponse } from "next/server";

import { getGithubData } from "@/services/github";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const yearParam = req.nextUrl.searchParams.get("year");
    const year = yearParam ? Number(yearParam) : undefined;

    if (year !== undefined && (!Number.isInteger(year) || year < 2008 || year > 2100)) {
      return NextResponse.json({ message: "Invalid year" }, { status: 400 });
    }

    const response = await getGithubData(year);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
