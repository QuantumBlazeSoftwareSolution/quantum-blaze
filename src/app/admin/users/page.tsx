import { getAllAdmins } from "@/lib/db/crud/admins/read";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserManager } from "@/components/admin/UserManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getServerSession();

  // Strict RBAC: Only super_admin can access this page
  if (!session || session.role !== "super_admin") {
    redirect("/"); // Redirect unauthorized users to dashboard
  }

  const admins = await getAllAdmins();

  return (
    <div className="w-full px-8 py-10 space-y-8">
      <UserManager initialAdmins={admins} />
    </div>
  );
}
