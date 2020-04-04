import http, { Server } from 'http';
import { createContext } from './Context';
import { EventEmitter } from 'events'

type Middleware<T = any> = (ctx: any, next: () => Promise<T>) => Promise<T>;
type MiddleNext = () => Promise<any>;

export interface OPTS { }

class Application extends EventEmitter {

  private middlewares: Middleware[] = [];
  private opt: OPTS;
  private server: Server;

  constructor(opts?: OPTS) {
    super();
    this.opt = opts;
  }

  use(middlware: Middleware) {
    this.middlewares.push(middlware)
  }

  private componse = () => {
    return (ctx: any) => {
      let next: () => Promise<any> = () => Promise.resolve();
      const createNext = (middleWare: Middleware, oldNext: () => Promise<any>) => {
        return async () => {
          return middleWare(ctx, oldNext);
        }
      }

      let len = this.middlewares.length;
      while (--len > -1) {
        let middleware = this.middlewares[len];
        next = createNext(middleware, next);
      }
      return next();
    }
  }

  private httpCallback = () => {
    return (req: http.IncomingMessage, res: http.ServerResponse) => {

      let ctx = createContext(req, res);
      ctx.app = this;

      let onResponse = () => {
        ctx.res.end(ctx.response.body);
      }

      let onError = (err:Error) => {
        ctx.res.end(err.message);
        this.emit('error',err);
      }

      let fn = this.componse();
      fn(ctx)
        .then(onResponse)
        .catch(onError);
    }
  }

  listen(port: number, callback: () => void) {
    this.server = http.createServer(this.httpCallback());
    this.server.listen(port, callback);
  }
}

export default Application;