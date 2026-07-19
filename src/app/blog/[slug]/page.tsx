import { blogs } from "@/lib/blogs";
import { BlogPostContent } from "@/components/pages/BlogPostContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  
  return {
    title: `${blog.title} | Quantum Blaze`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) {
    notFound();
  }

  // Find related posts (exclude current, take up to 3)
  const relatedPosts = blogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  return <BlogPostContent blog={blog} relatedPosts={relatedPosts} />;
}
