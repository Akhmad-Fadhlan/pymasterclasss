import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { CategoryService } from "@/services/CategoryService";

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch categories list (Public)
    const result = await CategoryService.listCategories();
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

    // 2. Parse body and create category via service
    const body = await req.json();
    const result = await CategoryService.createCategory(user.id, body);

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
