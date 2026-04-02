import { CONFIG } from '../constants/config';

export interface ProjectItem {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
}

export interface Category {
  id: string;
  title: string;
  items: ProjectItem[];
}

/**
 * Fetches the dynamic portfolio content from Google Sheets Apps Script API.
 */
export async function fetchPortfolioData(): Promise<Category[]> {
  const url = CONFIG.API.SHEET_URL;
  if (!url || url.includes("YOUR_API_ID")) {
    console.warn("Google Sheets API URL is not configured. Returning empty data.");
    return [];
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Google Sheets data:", error);
    return [];
  }
}
