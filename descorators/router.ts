import { METHOD } from '../constants';
import { Context } from 'koa';
import Container from '../container';


export function Request(path: string, method: METHOD) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const handler = descriptor.value;
        descriptor.value = async function (ctx: Context) {
            const params = Object.create(null);
            const result = await handler.call(this, Object.assign(params, ctx.params, ctx.query));
            ctx.body = result;
        }
        Container.registRouter({ path, method, serviceIdentifier: target.constructor.name, methodName: key });
    }
}

export function GET(path: string) {
    return Request(path, METHOD.GET);
}

export function POST(path: string) {
    return Request(path, METHOD.POST);
}

export function PUT(path: string) {
    return Request(path, METHOD.PUT);
}

export function DELETE(path: string) {
    return Request(path, METHOD.DELETE);
}

export function DEL(path: string) {
    return Request(path, METHOD.DEL);
}

export function HEAD(path: string) {
    return Request(path, METHOD.HEAD);
}

export function OPTIONS(path: string) {
    return Request(path, METHOD.OPTIONS);
}
