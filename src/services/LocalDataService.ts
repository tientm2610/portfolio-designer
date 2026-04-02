export interface ProjectItem {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  description?: string;
}

/**
 * Lấy dữ liệu từ file local projects.json 
 * Giải pháp tối ưu, không cần server API, không phụ thuộc bên thứ 3.
 */
export async function getPortfolioMedia(): Promise<ProjectItem[]> {
  try {
    const response = await fetch('/projects.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch local projects data.`);
    }
    const data: ProjectItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
}
