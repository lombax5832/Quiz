import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenGetter } from '../types/tokengetter';
import getToken from './gettoken';



class HttpClient {

  private instance: AxiosInstance;
  private getToken: TokenGetter;

  constructor(getToken: TokenGetter) {
    this.getToken = getToken;
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 1000,
      headers: { 'X-Client-ID': 'web' },
    });

  }

  makeRequest<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>{
    return this.getToken().then(token => {
      let reqHeaders = config.headers || [];
      if(token){
        reqHeaders = {...reqHeaders, authorization: `Bearer ${token}`}
      }
      const reqConfig = {...config, headers: reqHeaders}

      return this.instance.request(reqConfig);
    })
  }

  get(url: string, config: AxiosRequestConfig = {}) {
    //return this.instance.get(url, config);
    return this.makeRequest({...config, url: url, method: 'get'})
  }

  post(url: string, data: any, config: AxiosRequestConfig = {}) {
    //return this.instance.post(url, data, config);
    return this.makeRequest({...config, url: url, data: data, method: 'post'})
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    //return this.instance.put(url, data, config);
    return this.makeRequest({...config, url: url, data: data, method: 'put'})
  }

  delete(url: string, config?: AxiosRequestConfig) {
    //return this.instance.delete(url, config);
    return this.makeRequest({...config, url: url, method: 'get'})
  }

}

export default new HttpClient(getToken);

