import url from 'url';
import http from 'http';

export interface iRequest {
  query?: string;
}

export function createRequest(req: http.IncomingMessage) : iRequest {
  return {
    get query(): string {
      return url.parse(req.url).query;
    }
  }
}