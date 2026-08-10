export interface Author {
  name: string;
  role: string;
  image: string;
}

export interface LocaleString {
  en: string;
  si: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocaleString;
  description: LocaleString;
  content: LocaleString;
  coverImage: string;
  date: string;
  readTime: string;
  category: "Engineering" | "Design" | "Architecture" | "Product Strategy";
  author: Author;
  featured?: boolean;
}
