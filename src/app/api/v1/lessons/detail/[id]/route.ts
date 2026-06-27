import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { LessonService } from "@/services/LessonService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await dynamic parameter id
    const { id } = await params;

    // 2. Fetch deep details through service
    const result = await LessonService.getLessonDetail(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify user session
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    // 2. Await dynamic parameter id
    const { id } = await params;
    const body = await req.json();

    // 3. Update lesson details via service
    const result = await LessonService.updateLesson(user.id, id, body);

    if (!result.success) {
      const isForbidden = result.message.includes("Forbidden");
      const isNotFound = result.message.includes("tidak ditemukan");
      let status = 422;
      if (isForbidden) status = 403;
      else if (isNotFound) status = 404;

      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify user session
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    // 2. Await dynamic parameter id
    const { id } = await params;

    // 3. Delete lesson via service
    const result = await LessonService.deleteLesson(user.id, id);

    if (!result.success) {
      const isForbidden = result.message.includes("Forbidden");
      const isNotFound = result.message.includes("tidak ditemukan");
      let status = 422;
      if (isForbidden) status = 403;
      else if (isNotFound) status = 404;

      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
