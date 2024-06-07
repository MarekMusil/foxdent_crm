import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import TokenService from "@/core/services/TokenService";

const config = {
  accessToken:
    "t0hN7PcgRM8RV05kehOhUxPKElMxAfEStzScqGAmWwNS2eRdLorv9YVIp45kU32ollqiN9xLGICPWROkWygdsafqsI27k554CmOy",
  appVersion: "foxdent_v1",
  appName: "foxdent_crm",
};

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    ApiService.vueInstance.axios.defaults.headers.common["Access-Token"] = config.accessToken;
    ApiService.vueInstance.axios.defaults.headers.common["App-Version"] = config.appVersion;
    ApiService.vueInstance.axios.defaults.headers.common["App-Name"] = config.appName;
    ApiService.vueInstance.axios.interceptors.response.use(null, (error) => {
      if (error?.response?.status === 401) {
        TokenService.destroyToken();
        window.location.href = "/";
      } else if (error.code === "ERR_NETWORK") {
        // cors error - the response is not available
        // return error with response
        return Promise.reject({
          ...error,
          response: {
            data: {
              message: "Network error",
            },
          },
        });
      }

      return Promise.reject(error);
    });
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string, slug = "" as string): Promise<AxiosResponse> {
    if (slug) {
      return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
    } else {
      return ApiService.vueInstance.axios.get(`${resource}`);
    }
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
