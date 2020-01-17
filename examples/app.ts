import * as Koa from 'koa';
import { initRouter } from '../';

const app = new Koa();

const router = initRouter();

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening 3000');
});