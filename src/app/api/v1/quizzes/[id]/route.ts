import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { QuizService } from "@/services/QuizService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await dynamic parameter containing lessonId
    const { id: lessonId } = await params;

    // 2. Fetch quiz details via service
    const result = await QuizService.getQuizByLessonId(lessonId);

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

    // 2. Await dynamic parameter containing quizId
    const { id } = await params;
    const body = await req.json();

    // 3. Update quiz details via service
    const result = await QuizService.updateQuiz(user.id, id, body);

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

    // 2. Await dynamic parameter containing quizId
    const { id } = await params;

    // 3. Delete quiz via service
    const result = await QuizService.deleteQuiz(user.id, id);

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
