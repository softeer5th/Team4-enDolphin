/* global RequestInit BodyInit HeadersInit */

const BASE_URL = import.meta.env.BASE_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestOptions = {
  headers?: HeadersInit;
};

const buildFetchOptions = (options?: RequestInit): RequestInit => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const headers = { ...defaultHeaders, ...options?.headers };

  const defaultOptions: RequestInit = {
    headers,
    mode: 'cors',
    credentials: 'include',
  };

  return { ...defaultOptions, ...options, headers };
};

export const executeRequest = async (
  method: Method,
  endpoint: string,
  body?: BodyInit,
  options?: RequestOptions,
) => {
  const fetchOptions = buildFetchOptions(options);

  try {
    const response = await fetch(BASE_URL + endpoint, {
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
  get: (endpoint: string) => executeRequest('GET', endpoint),
  post: (endpoint: string, body?: BodyInit) => executeRequest('POST', endpoint, body),
  put: (endpoint: string, body?: BodyInit) => executeRequest('PUT', endpoint, body),
  delete: (endpoint: string) => executeRequest('DELETE', endpoint),
};
