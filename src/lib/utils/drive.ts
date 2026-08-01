export function getDirectDriveImage(url: string): string {
  if (!url) return "";

  // Extract file ID from standard Google Drive URL pattern
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Fallback if it's already a direct download URL format or other
  if (url.includes("drive.google.com/uc")) {
    return url;
  }

  return url;
}
