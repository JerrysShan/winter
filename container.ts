import { ServiceIdentifier } from './types/service_identifier';
import { ServiceMetadata } from './types/service_metadata';


export interface RouterHanler {
    method: string;
    path: string;
    serviceIdentifier: string;
    methodName: string;
}

export interface Handler {
    object: any;
    key: string;
    type: any;
    index?: number;
}

export default class Container {
    private static container: ServiceMetadata[] = [];
    private static handlers: Map<Function, Handler[]> = new Map();
    public static routers: RouterHanler[] = [];

    public static get(identifier: ServiceIdentifier) {
        const servcie = this.findService(identifier);
        if (!servcie) {
            throw new Error(`${identifier} service not found`)
        }
        if (servcie.value) {
            return servcie.value;
        }
        const type = servcie.type;
        const value = new (type.bind.apply(type, [null]))();
        if (this.handlers.has(type)) {
            const arr = this.handlers.get(type) || [];
            arr.forEach(h => {
                value[h.key] = this.get(h.type);
            });
        }
        if (!servcie.transient) {
            servcie.value = value;
        }
        return value;
    }

    public static set(service: ServiceMetadata) {
        this.container.push(service);
    }

    public static exist(): boolean {
        return true;
    }

    public static registHandler(identifier: Function, handler: Handler) {
        if (this.handlers.get(identifier)) {
            const handlers = this.handlers.get(identifier) || [];
            handlers.push(handler);
            this.handlers.set(identifier, handlers);
        } else {
            this.handlers.set(identifier, [handler]);
        }
    }

    public static registRouter(router: RouterHanler) {
        this.routers.push(router);
    }

    private static findService(identifier: ServiceIdentifier): ServiceMetadata | undefined {
        return this.container.find(service => {
            return service.id === identifier || service.type === identifier;
        });
    }
}