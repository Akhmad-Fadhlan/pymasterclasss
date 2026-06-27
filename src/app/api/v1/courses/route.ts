import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { CourseService } from "@/services/CourseService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const categoryId = searchParams.get("categoryId") || undefined;
    const level = searchParams.get("level") || undefined;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || "PUBLISHED";

    const result = await CourseService.listCourses({
      page,
      limit,
      status,
      categoryId,
      level,
      search,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify user session
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    // 2. Parse body and create course via service
    const body = await req.json();
    const result = await CourseService.createCourse(user.id, body);

    if (!result.success) {
      const isForbidden = result.message.includes("Forbidden");
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: isForbidden ? 403 : 422 }
      );
    }

    return NextResponse.json(result, { status: 201 }); // 201 Created
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
