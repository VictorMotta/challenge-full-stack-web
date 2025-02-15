import axios, { AxiosError } from "axios";
import { setCookie, parseCookies } from "nookies";
import { EventEmitter } from "@/utils/helpers/eventEmitter";
import { CustomEvents } from "@/domain/custom-events";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

const ignorePaths = ["/users/"];

api.interceptors.request.use(async (response) => {
  if (!ignorePaths.some((it) => response.url!.startsWith(it))) {
  } else return response;
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    try {
      const originReq = error.config!;
      const isRetry = originReq.headers["retry"] ?? false;

      if (
        error.response!.status === 401 &&
        !originReq._retry &&
        !isRetry &&
        !ignorePaths.some((it) => it.startsWith(originReq.url))
      ) {
        originReq._retry = true;

        return api.request(originReq);
      } else {
        return Promise.reject(error);
      }
    } catch (error) {
      if (error instanceof AxiosError)
        EventEmitter.instance.emit(CustomEvents.UNAUTH, {
          status: error.stack ?? 401,
          message: error.response?.data.detail ?? error!.message!
        });
      return Promise.reject(error);
    }
  }
);
