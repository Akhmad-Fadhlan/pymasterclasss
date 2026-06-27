import { NextRequest, NextResponse } from "next/server";
import { LessonService } from "@/services/LessonService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ missionId: string }> }
) {
  try {
    // 1. Await dynamic parameter missionId
    const { missionId } = await params;

    // 2. Fetch sorted lessons through service
    const result = await LessonService.listLessons(missionId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
