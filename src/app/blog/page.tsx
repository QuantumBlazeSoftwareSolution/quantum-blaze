import { BlogContent } from "@/components/pages/BlogContent";
import { blogs } from "@/lib/blogs";

export const metadata = {
  title: "Blog & Insights | Quantum Blaze",
  description: "Deep dives into software architecture, Next.js scaling, design systems, and modern digital product strategies by elite developers.",
};

export default function BlogPage() {
  return <BlogContent initialBlogs={blogs} />;
}
