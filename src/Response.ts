
import http from 'http';

export interface iResponse<T = any> {
  body?: T;
}

export function createResponse(res: http.ServerResponse): iResponse {
  let _data = {};
  return {
    get body() {
      return _data;
    },
    set body(data: any) {
      _data = data;
    }
  }
}