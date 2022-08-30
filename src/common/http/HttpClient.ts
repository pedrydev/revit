/* eslint-disable security/detect-object-injection */
type ResponseType = 'blob' | 'json' | 'text';

interface FetchOptions {
  init: Pick<RequestInit, 'body' | 'headers' | 'method'>;
  responseType?: ResponseType;
  url: string;
}

export interface HttpClientOptions {
  getToken?: () => Promise<string>;
  headers?: HeadersInit;
  url: string;
}

export interface HttpOptions {
  headers?: HeadersInit;
  responseType?: ResponseType;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpPostData = Record<string, any>;

export interface HttpPostOptions extends HttpOptions {
  data: HttpPostData;
}

export default class HttpClient {
  private readonly headers: HeadersInit;
  private readonly getToken: (() => Promise<string>) | undefined;
  private readonly url: string;

  constructor({ getToken, headers = {}, url }: HttpClientOptions) {
    this.getToken = getToken;
    this.headers = headers;
    this.url = url;
  }

  async delete({ headers, responseType, url }: HttpOptions) {
    return this.fetch({
      init: {
        headers,
        method: 'DELETE',
      },
      responseType,
      url,
    });
  }

  async get({ headers = {}, responseType = 'json', url }: HttpOptions) {
    return this.fetch({
      init: {
        headers,
        method: 'GET',
      },
      responseType,
      url,
    });
  }

  async post({ data, headers = {}, responseType, url }: HttpPostData) {
    return this.postOrPut({ data, headers, responseType, url }, 'POST');
  }

  async put({ data, headers = {}, responseType, url }: HttpPostData) {
    return this.postOrPut({ data, headers, responseType, url }, 'PUT');
  }

  async postOrPut(
    { data, headers = {}, responseType, url }: HttpPostOptions,
    method: 'POST' | 'PUT'
  ) {
    let body: FormData | string;
    let reqHeaders = Object.assign(this.headers, headers);

    if (!Object.keys(data).some((key) => data[key] instanceof File)) {
      body = JSON.stringify(data);
      reqHeaders = {
        ...reqHeaders,
        'Content-Type': 'application/json; charset=UTF-8',
      };
    } else {
      body = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof File) {
          (body as FormData).append(key, data[key]);
        } else {
          (body as FormData).append(key, JSON.stringify(data[key]));
        }
      });
    }

    return this.fetch({
      init: {
        body,
        headers: reqHeaders,
        method,
      },
      responseType,
      url,
    });
  }

  private async fetch({ init, responseType, url }: FetchOptions) {
    let data = null;
    const { headers = {}, ...reqInit } = init;
    const response = await fetch(`${this.url}/${url}`, {
      cache: 'no-cache', // Caching is done by react-query
      headers: Object.assign(this.headers, headers, {
        authorization: this.getToken ? 'Bearer ' + (await this.getToken()) : '',
      }),
      ...reqInit,
    });
    if (response.ok) {
      if (responseType === 'blob') data = await response.blob();
      if (responseType === 'json') data = await response.json();
      if (responseType === 'text') data = await response.text();
      return { response, data };
    } else {
      let error = await response.text();
      try {
        error = JSON.parse(error);
      } catch (_) {
        /* return error as plain text */
      }
      throw new Error(error);
    }
  }
}
