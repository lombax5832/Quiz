import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpClient {

  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 1000,
      headers: { 'X-Client-ID': 'web' },
    });

  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

}

export default new HttpClient();
