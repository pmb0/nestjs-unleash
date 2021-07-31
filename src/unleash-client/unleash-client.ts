import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class UnleashClient {
  private readonly logger = new Logger(UnleashClient.name)

  constructor(private readonly http: HttpService) {}

  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    const method = config.method ?? '(unknown method)'
    const baseUrl = this.http.axiosRef.defaults.baseURL ?? '(unknown base url)'
    const url = config.url ?? '(unknown url)'

    this.logger.debug(`Request: ${method} ${baseUrl}${url}`)
    const response = await firstValueFrom(this.http.request<T>(config))
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
