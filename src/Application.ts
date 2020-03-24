import http, { Server } from 'http';


type Middleware<T = any> = (ctx: any, next: () => Promise<T>) => Promise<T>;
type MiddleNext = () => Promise<any>;

export interface OPTS { }

class Application {
  private middlewares: Middleware[] = [];
  private opt: OPTS;
  private server: Server;

  constructor(opts?: OPTS) {
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
    return (req: any, res: any) => {
      let ctx = '';
      let fn = this.componse();
      fn(ctx);
    }
  }

  listen(port: number, callback: () => void) {
    this.server = http.createServer(this.httpCallback());
    this.server.listen(port, callback);
  }
}

export default Application;