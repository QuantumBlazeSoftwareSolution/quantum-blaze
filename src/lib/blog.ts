import Papa from "papaparse";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  coverImage: string;
  excerpt: string;
  content: string;
}

// Read spreadsheet URL from environment variable
const SHEET_CSV_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!SHEET_CSV_URL) {
    console.warn("NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL is not defined.");
    return [];
  }

  try {
    const response = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 300 }, // Cache results for 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Google Sheet CSV: ${response.statusText}`
      );
    }

    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            resolve(results.data as BlogPost[]);
          } else {
            resolve([]);
          }
        },
        error: (error: any) => {
          console.error("Error parsing CSV data:", error);
          resolve([]);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    return [];
  }
}
