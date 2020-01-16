import Container from '../container';

export function Service(serviceIdentifier?: string) {
    return function (target: any) {
        Container.set(serviceIdentifier || target.name, target);
    }
}