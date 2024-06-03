import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { USER_TOKEN, getApiUrl } from "@/config/index";
import { ApiResponse } from "@/config/types";

class RequestClient {
  private axiosInstance: AxiosInstance;

  private isErrorModalVisible: boolean = false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: getApiUrl(),
    });

    this.axiosInstance.interceptors.response.use(
      this.handleSuccessResponse.bind(this),
      this.handleErrorResponse.bind(this)
    );
  }

  private handleAddTokenToConfig(
    config: AxiosRequestConfig = {}
  ): AxiosRequestConfig {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return config;
  }

  private handleSuccessResponse<T>(
    response: AxiosResponse<ApiResponse<T>>
  ): AxiosResponse<ApiResponse<T>> {
    const { code, message } = response.data;
    if (code !== 200 && message) {
      this.showErrorModal(message);
    }
    return response;
  }

  private handleErrorResponse(error: AxiosError<ApiResponse<any>>): void {
    if (error.response) {
      const { status, data } = error.response;
      this.showErrorModal(`HTTP ${status}: ${data.message}`);
    } else if (error.request) {
      this.showErrorModal("Request error.");
    } else {
      this.showErrorModal("Network error.");
    }
  }

  private showErrorModal(message: string): void {
    if (!this.isErrorModalVisible) {
      this.isErrorModalVisible = true;
      console.log("请求异常：", message);
      uni.showToast({
        title: message,
        icon: "none",
      });
      // Implement actual error modal display logic here
      // e.g., using a UI framework's modal component
      setTimeout(() => {
        this.isErrorModalVisible = false;
      }, 1000);
    }
  }

  async get<T = any>(
    url: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
      params,
    };
    return this.axiosInstance
      .get(url, this.handleAddTokenToConfig(config))
      .then((response) => response.data);
  }

  async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.axiosInstance
      .post(url, data, this.handleAddTokenToConfig())
      .then((response) => response.data);
  }

  async upload<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.axiosInstance
      .post(url, formData, this.handleAddTokenToConfig(config))
      .then((response) => response.data);
  }
}

export default new RequestClient();
