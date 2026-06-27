import { NextRequest, NextResponse } from "next/server";
import { MissionService } from "@/services/MissionService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // 1. Await dynamic parameter courseId
    const { courseId } = await params;

    // 2. Fetch sorted missions through service
    const result = await MissionService.listMissions(courseId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
