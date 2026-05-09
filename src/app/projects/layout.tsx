import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work & Case Studies",
  description: "Explore our portfolio of high-end digital products, enterprise SaaS platforms, and mobile applications engineered for scale.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
