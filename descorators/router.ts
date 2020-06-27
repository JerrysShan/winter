import { Context } from 'koa';
import { METHOD } from '../types/request_method';
import Container from '../container';
import { ParameterDesc, ParameterType } from '../types/parameter';
import { METADATA_PARAM } from '../constants';

function getParams(ctx: Context, descs: ParameterDesc[]): any {
    let arr: any = [];
    descs.forEach(desc => {
        switch (desc.type) {
            case ParameterType.body:
                arr[desc.index] = ctx.request.body;
                break;
            case ParameterType.header:
                arr[desc.index] = ctx.header;
                break;
            case ParameterType.query:
                arr[desc.index] = ctx.query;
                break;
            case ParameterType.params:
                arr[desc.index] = ctx.params;
                break;
            default:
                throw new Error('unknown params');
        }
    });
    return arr;
}


export function Request(path: string, method: METHOD) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const handler = descriptor.value;
        const descs = Reflect.getMetadata(METADATA_PARAM, target, key);
        descriptor.value = async function (ctx: Context) {
            const params = getParams(ctx, descs);
            const result = await handler.call(this, Object.assign(params, ...params));
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
