import { NextRequest, NextResponse } from "next/server";
import { CourseService } from "@/services/CourseService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || undefined;
    const category = searchParams.get("category") || undefined;
    const level = searchParams.get("level") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Run searches via CourseService
    const result = await CourseService.searchCourses({
      keyword,
      category,
      level,
      page,
      limit,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
