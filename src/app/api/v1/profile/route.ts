import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { ProfileService } from "@/services/ProfileService";

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

    // 2. Fetch profile via Service layer
    const result = await ProfileService.getProfile(user.id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: result.message, data: result.data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1. Verify user session
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    // 2. Parse body and delegate logic to Service layer
    const body = await req.json();
    const result = await ProfileService.updateProfile(user.id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { success: true, message: result.message, data: result.data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server", errors: [error.message] },
      { status: 500 }
    );
  }
}
