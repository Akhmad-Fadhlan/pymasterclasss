import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { UploadService } from "@/services/UploadService";

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

    // 2. Parse Multipart FormData and retrieve file input
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Bad Request: File tidak ditemukan dalam request", errors: ["File wajib dilampirkan"] },
        { status: 400 }
      );
    }

    // 3. Delegate file upload to UploadService
    const result = await UploadService.uploadCourseThumbnail(user.id, file);

    if (!result.success) {
      const isForbidden = result.message.includes("Forbidden");
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: isForbidden ? 403 : 422 }
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
