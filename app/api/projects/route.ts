import { NextResponse } from "next/server";
import { getProjectsData } from "@/services/projects";

export const GET = async () => {
  try {
    const data = await getProjectsData();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Project API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
