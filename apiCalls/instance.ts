import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

let baseURL = "http://localhost:3001";
if (process.env.ENV === "production") {
  baseURL = process.env.BACKEND_URL!;
}

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

type ApiResponse<T = any> = {
  data: T;
  status: "success" | "error";
  message: String;
};

API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("collector_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

API.interceptors.response.use(
  async (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError<ApiResponse>) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.error("API error response:", error.response);

      if (status === 401) {
        console.error("Unauthorized. Redirecting to login.");
      } else if (status === 403) {
        console.error("Forbidden. You don’t have permission.");
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error(error.response?.data?.message || "Something went wrong");
      }

      return Promise.reject(error.response?.data || error);
    }
    return Promise.reject(error);
  }
);

export default API;
