import { HttpService, Injectable } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'

@Injectable()
export class UnleashClient {
  constructor(private readonly http: HttpService) {}

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.http.request<T>(config).toPromise()
    return response.data
  }

  async get<TResponse = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      method: 'GET',
      url,
    })
  }

  async post<TResponse = unknown, TRequest = unknown>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    return this.request<TResponse>({
      ...config,
      data: data ?? {},
      method: 'POST',
      url,
    })
  }
}
