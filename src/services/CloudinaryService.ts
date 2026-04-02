import { CONFIG } from "../constants/config";

export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: "image" | "video";
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

export interface CloudinaryResponse {
  resources: CloudinaryResource[];
  updated_at: string;
}

/**
 * Fetches dynamic media from Cloudinary using Client-side asset lists.
 * Must have "Client-side asset lists" enabled in Security settings in Cloudinary.
 */
export async function getPortfolioMedia(): Promise<CloudinaryResource[]> {
  const { CLOUD_NAME, TAG } = CONFIG.CLOUDINARY;
  
  if (!CLOUD_NAME || !TAG) {
    console.warn("Cloudinary Cloud Name or Tag is missing in environment variables.");
    return [];
  }

  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`
    );

    if (!response.ok) {
      throw new Error(`Cloudinary fetch failed: ${response.statusText}`);
    }

    const data: CloudinaryResponse = await response.json();
    return data.resources;
  } catch (error) {
    console.error("Error fetching media from Cloudinary:", error);
    return [];
  }
}
