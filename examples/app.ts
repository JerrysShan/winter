import * as Koa from 'koa';
import * as path from 'path';
import { loadControllers, initRouter } from '../';

const app = new Koa();
loadControllers(path.resolve(__dirname + '/contollers'));

const router = initRouter();

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening 3000');
});