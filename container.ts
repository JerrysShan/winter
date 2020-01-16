
export interface RouterHanler {
    method: string;
    path: string;
    serviceIdentifier: string;
    methodName: string;
}

export default class Container {
    private static container: Map<string, any> = new Map();
    private static handlers: Map<string, any> = new Map();
    public static routers: RouterHanler[] = [];

    public static get(identifier: string) {
        if (!this.container.has(identifier)) {
            throw new Error(`${identifier} service not found`)
        }
        const type = this.container.get(identifier);
        const value = new (type.bind.apply(type));
        if (this.handlers.has(identifier)) {
            const arr = this.handlers.get(identifier);
            arr.forEach(h => {
                console.log(h[0]);
                const first = h[0] as string;
                const id = first.toUpperCase() + h.slice(1).toString();
                console.log(id, this.get(id), 'Id');
                value[h] = this.get(id);
            });
        }
        return value;
    }

    public static set(serviceIdentifier: string, type: any) {
        this.container.set(serviceIdentifier, type);
    }

    public static exist(): boolean {
        return true;
    }

    public static registHandler(identifier: string, handler) {
        console.log(identifier, 'identifier')
        if (this.handlers.get(identifier)) {
            const handlers = this.handlers.get(identifier);
            handlers.push(handler);
            this.handlers.set(identifier, handlers);
        } else {
            this.handlers.set(identifier, [handler]);
        }
    }

    public static registRouter(router: RouterHanler) {
        this.routers.push(router);
    }
}