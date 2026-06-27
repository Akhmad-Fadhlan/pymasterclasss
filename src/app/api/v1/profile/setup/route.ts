import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { ProfileService } from "@/services/ProfileService";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify that user session exists in cookies
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Sesi tidak ditemukan atau kadaluarsa", errors: ["Unauthorized"] },
        { status: 401 }
      );
    }

    // 2. Parse body and route logic to Service layer
    const body = await req.json();
    const result = await ProfileService.setupProfile(user.id, body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 422 } // Validation/Unprocessable Entity error status
      );
    }

    // 3. Return standardized success response
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
