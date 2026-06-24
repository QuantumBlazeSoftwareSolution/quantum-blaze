
import { TeamContent } from "@/components/pages/TeamContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Team | Quantum Blaze",
  description: "Meet the elite engineers and designers behind Quantum Blaze.",
};

export default async function TeamPage() {

  return <TeamContent members={members} />;
}
