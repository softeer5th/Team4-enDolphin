/* global RequestInit BodyInit HeadersInit */

import { serviceENV } from '@/envconfig';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestOptions = {
  headers?: HeadersInit;
};

const buildFetchOptions = (options?: RequestInit): RequestInit => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  const headers = { ...defaultHeaders, ...options?.headers };

  const defaultOptions: RequestInit = {
    headers,
    mode: 'cors',
    // accessToken을 쿠키로 관리하기 위한 설정
    credentials: 'include',
  };

  return { ...defaultOptions, ...options, headers };
};

interface FetchRequest {
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  options?: RequestOptions;
}

export const executeFetch = async (
  method: Method,
  endpoint: string,
  { params, body, options }: FetchRequest = {},
) => {
  const fetchOptions = buildFetchOptions(options);
  const queryString = params && Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';
  const fullUrl = `${serviceENV.BASE_URL}${endpoint}${queryString}`;

  try {
    const response = await fetch(fullUrl, {
      method: method,
      body: JSON.stringify(body),
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Network Error : ${error}`);
  }
};

/**
 * HTTP 요청을 수행하기 위한 헬퍼 메서드를 제공합니다.
 *
 * 이 객체는 일반적인 API 작업을 수행하기 위해 HTTP 메서드를 캡슐화합니다.
 * GET, POST, PUT, DELETE 요청을 헬퍼 함수로 지원하며,
 * 각 메서드는 프로미스를 반환합니다.
 *
 * @example
 * const data = await request.get<MyDataType>('https://api.example.com/data');
 *
 * @property get - 지정된 엔드포인트로 HTTP GET 요청을 보냅니다.
 * @property post - 지정된 엔드포인트로 선택적 본문과 함께 HTTP POST 요청을 보냅니다.
 * @property put - 지정된 엔드포인트로 선택적 본문과 함께 HTTP PUT 요청을 보냅니다.
 * @property delete - 지정된 엔드포인트로 HTTP DELETE 요청을 보냅니다.
 */
export const request = {
  get: (endpoint: string, props?: Pick<FetchRequest, 'params'>) =>
    executeFetch('GET', endpoint, props),
  post: (endpoint: string, props?: Pick<FetchRequest, 'body'>) => 
    executeFetch('POST', endpoint, props),
  put: (endpoint: string, props?: Pick<FetchRequest, 'body'>) => 
    executeFetch('PUT', endpoint, props),
  delete: (endpoint: string) => 
    executeFetch('DELETE', endpoint),
};
