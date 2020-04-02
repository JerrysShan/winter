import * as Koa from 'koa';
import * as path from 'path';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import 'reflect-metadata';
import { ApplicationOptions } from './types/app_options';
import Container from './container';
import { METADATA_PREFIX } from './constants';
import { loadControllers } from './loaders';

/**
 * Application extends Koa
 */
export default class Application extends Koa {
    private options: ApplicationOptions;
    private router: Router;
    constructor(options: ApplicationOptions) {
        super();
        this.options = options;
        Container.set({ id: 'logger', value: options.logger || console });
        this.router = new Router();

        // 初始化路由
        this.initRouter();

        // 加载请求参数处理中间件
        this.use(bodyParser());

        // 加载传入的中间件
        const middlewares = options.middlewares || [];
        middlewares.forEach(m => {
            this.use(m);
        });
        // 最后加载路由的中间件
        this.use(this.router.routes());
    }

    initRouter() {
        const dir = path.join(process.cwd(), this.options.controllerDir || '/controller');
        loadControllers(dir);
        Container.routers.forEach(r => {
            const instance = Container.get(r.serviceIdentifier);
            const prefix = Reflect.getMetadata(METADATA_PREFIX, instance) || '';
            this.router[r.method](prefix + r.path, instance[r.methodName].bind(instance));
        });
    }
}