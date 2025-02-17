import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export interface RequestHelperInterface {
  make<T>(
    params: RequestHelper.Make.Params
  ): Promise<RequestHelper.Make.Response<T>>;
}

export namespace RequestHelper {
  export namespace Make {
    export type Params = {
      url: string;
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      data?: unknown;
      headers?: Record<string, string>; // Adicionamos headers personalizados
    };

    export type Response<T> =
      | {
          statusCode: number;
          body: T;
        }
      | {
          statusCode: number;
          error: Error;
        };
  }
}

export class RequestHelper implements RequestHelperInterface {
  public static instance: RequestHelperInterface = new RequestHelper();

  async make<T>(
    params: RequestHelper.Make.Params
  ): Promise<RequestHelper.Make.Response<T>> {
    const { url, method, data, headers = {} } = params;
    const fullUrl = `${BASE_URL}${url}`;

    console.log(`Request: ${method} ${fullUrl}`);

    const authStore = useAuthStore();
    const token = authStore.token;

    try {
      const response = await axios.request({
        url: fullUrl,
        method,
        data,
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : ""
        }
      });

      return { statusCode: response.status, body: response.data };
    } catch (error: any) {
      return {
        statusCode: error.response?.status || 500,
        error: new Error(
          error.response?.data?.message || error.message || "Erro desconhecido"
        )
      };
    }
  }
}
