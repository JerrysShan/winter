import 'reflect-metadata';
import { METADATA_PREFIX } from '../constants';
import Container from '../container';

export function Controller(prefix: string) {
    return function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
        Reflect.defineMetadata(METADATA_PREFIX, prefix, target.prototype);
        Container.set({ type: target, id: target.name, transient: false });
    }
}