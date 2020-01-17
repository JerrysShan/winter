import * as Router from 'koa-router';
import 'reflect-metadata';
import Container from './container';
import { METADATA_PREFIX } from './constants';


export function initRouter(): Router {
    const router = new Router();
    Container.routers.forEach(r => {
        const instance = Container.get(r.serviceIdentifier);
        const prefix = Reflect.getMetadata(METADATA_PREFIX, instance) || '';
        router[r.method](prefix + r.path, instance[r.methodName].bind(instance));
    });
    return router;
}