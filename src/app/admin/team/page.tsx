import { TeamManager } from "@/components/admin/TeamManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Team Members | Quantum Blaze Admin",
};

export default async function AdminTeamPage() {

  return (
    <div className="w-full space-y-6">
      <TeamManager initialMembers={members} />
    </div>
  );
}
