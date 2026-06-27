"use server";

import { AuthService } from "@/services/AuthService";

export async function registerAction(data: any) {
  return AuthService.register(data);
}

export async function loginAction(data: any) {
  return AuthService.login(data);
}

export async function verifyOtpAction(data: any) {
  return AuthService.verifyOtp(data);
}

export async function logoutAction() {
  return AuthService.logout();
}

export async function requestPasswordResetAction(data: any) {
  return AuthService.requestPasswordReset(data);
}

export async function resetPasswordAction(data: any) {
  return AuthService.resetPassword(data);
}

export async function resendVerificationOtpAction(data: any) {
  return AuthService.resendVerificationOtp(data);
}
