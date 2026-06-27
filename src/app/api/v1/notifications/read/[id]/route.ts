import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { NotificationService } from "@/services/NotificationService";

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

    // 2. Await dynamic parameters (Next.js 15 specification)
    const { id } = await params;

    // 3. Mark notification as read via service layer
    const result = await NotificationService.markAsRead(user.id, id);

    if (!result.success) {
      const isForbidden = result.message.includes("Forbidden");
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: isForbidden ? 403 : 404 }
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
