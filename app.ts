// import Koa from 'koa'
// import { Context } from 'koa';

import Koa from './src/Application';

let app = new Koa();

app.use(async (ctx,next)=> {
  console.log('middle 1 start');
  await next();
  console.log('middle 1 end');
})


app.use(async (ctx,next)=> {
  console.log('middle 2 start');
  await next();
  console.log('middle 2 end');
})

app.use(async (ctx,next)=> {
  console.log('middle 3 start');
  await next();
  ctx.response.body = 'hellow 123';
  console.log('middle 3 end');
})

app.use(async (ctx,next)=> {
  console.log('middle 4 start');
  await next();
  throw new Error('抛出错误异常 12306....');
  console.log('middle 4 end');
})

app.on('error',(err)=> {
  console.log('捕获到错误异常....' + err.message);
})

app.listen(3000, () => {
  console.log('server is started port 3000....');
})