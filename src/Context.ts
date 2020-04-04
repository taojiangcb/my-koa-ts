import http from 'http';
import { iRequest, createRequest } from './Request';
import { iResponse, createResponse } from './Response';

interface iContext {
  request: iRequest;
  response: iResponse;
  req: http.IncomingMessage;
  res: http.ServerResponse;
  app?:any;
}

export function createContext(req: http.IncomingMessage, res: http.ServerResponse): iContext {
  let _req = createRequest(req);
  let _res = createResponse(res);
  return {
    request: _req,
    response: _res,
    req: req,
    res: res,
  }
}