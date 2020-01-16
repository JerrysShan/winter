import Container from '../container';

export function Inject() {
    return function (target: any, key: string) {
        Container.registHandler(target.constructor.name, key);
    }
}