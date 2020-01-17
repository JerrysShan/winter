import * as Koa from 'koa';
import { router } from './router';

const app = new Koa();
app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening:3000');
});