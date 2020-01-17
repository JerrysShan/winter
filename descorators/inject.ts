import Container from '../container';
import 'reflect-metadata';

export function Inject(typeOrName?: string) {
    return function (target: any, key: string, index?: number) {
        if (!typeOrName) {
            typeOrName = Reflect.getMetadata("design:type", target, key);
        }
        Container.registHandler(target.constructor, {
            object: target,
            key,
            type: typeOrName,
            index,
        });
    }
}