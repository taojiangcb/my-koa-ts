// import Koa from 'koa'
// import { Context } from 'koa';

import Koa from './src/Application';

let app = new Koa();

app.use(async (ctx,next)=> {
  console.log('middle 1 start');
  await next();
  console.log('middle 1 end');
})

app.listen(3000, () => {
  console.log('server is started port 3000....');
})