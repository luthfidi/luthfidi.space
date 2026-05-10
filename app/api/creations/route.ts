import { type NextRequest, NextResponse } from "next/server";

import {
  getCreationsData,
  getCreationCategories,
  getCreationAccounts,
} from "@/services/creations";
import type { CreationSortBy } from "@/common/types/creations";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const account = searchParams.get("account") || undefined;
    const platform = searchParams.get("platform") || undefined;
    const category = searchParams.get("category") || undefined;
    const sortBy = (searchParams.get("sortBy") as CreationSortBy) || "date";

    const [items, categories, accounts] = await Promise.all([
      getCreationsData({ account, platform, category, sortBy }),
      getCreationCategories(),
      getCreationAccounts(),
    ]);

    return NextResponse.json(
      { items, categories, accounts },
      { status: 200 },
    );
  } catch (error) {
    console.error("Creations API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
