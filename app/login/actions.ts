"use server";

import { redirect } from "next/navigation";

import { isValidDemoRole } from "@/lib/demo-auth";
import { loginDemoUser, logoutDemoUser } from "@/lib/demo-auth-server";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function loginDemoAction(formData: FormData) {
  const role = getFormString(formData, "role");

  if (!isValidDemoRole(role)) {
    redirect("/login?error=invalid-role");
  }

  loginDemoUser(role);
  redirect("/dashboard");
}

export async function logoutDemoAction() {
  logoutDemoUser();
  redirect("/login");
}
