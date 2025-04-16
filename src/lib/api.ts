export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Helper function to handle API requests
  export const fetchApi = async <T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      console.log("url", url);
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json(); // Handle API error messages
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("data", data);

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || "Something went wrong" };
    }
  };
  