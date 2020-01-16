import 'reflect-metadata';
import { METADATA_PREFIX } from '../constants';
import Container from '../container';

export function Controller(prefix: string) {
    return function (target: any) {
        Reflect.defineMetadata(METADATA_PREFIX, prefix, target.prototype);
        Container.set(target.name, target);
    }
}