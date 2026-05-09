import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getServerSession();

  // If already logged in, redirect to dashboard immediately.
  // This prevents the login form from flashing inside the admin layout.
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
