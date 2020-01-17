import * as Router from 'koa-router';
import 'reflect-metadata';
import Container from './container';
import { METADATA_PREFIX } from './constants';

import { loadControllers } from './loaders';


export function initRouter(): Router {
    loadControllers();
    const router = new Router();
    Container.routers.forEach(r => {
        const instance = Container.get(r.serviceIdentifier);
        const prefix = Reflect.getMetadata(METADATA_PREFIX, instance) || '';
        router[r.method](prefix + r.path, instance[r.methodName].bind(instance));
    });
    return router;
}