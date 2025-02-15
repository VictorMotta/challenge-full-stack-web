import axios from "axios";

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
    const { url, method, data } = params;
    const fullUrl = `${BASE_URL}${url}`;

    console.log(fullUrl);

    try {
      const response = await axios.request({
        url: fullUrl,
        method,
        data
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
