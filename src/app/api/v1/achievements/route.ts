import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { AchievementService } from "@/services/AchievementService";

export async function GET(req: NextRequest) {
  try {
    // 1. Verify user session
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("type");

    // 2. Fetch earned vs all achievements based on query filter
    if (filter === "earned") {
      const result = await AchievementService.getUserAchievements(user.id);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await AchievementService.getAllAchievements();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
