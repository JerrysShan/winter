import Container from '../container';

export function autowired(serviceIdentifier?: string) {
    return function (target: any) {
        Container.set({ type: target, id: serviceIdentifier || target });
    }
}