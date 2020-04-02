import { ServiceIdentifier } from './types/service_identifier';
import { ServiceMetadata } from './types/service_metadata';
import { Handler } from './types/handler';
import { RouterHandler } from './types/router_handler';


export class ContainerInstance {
    private container: ServiceMetadata[] = [];
    private handlers: Map<Function, Handler[]> = new Map();
    public routers: RouterHandler[] = [];

    private findService(identifier: ServiceIdentifier): ServiceMetadata | undefined {
        return this.container.find(service => {
            return service.id === identifier || service.type === identifier;
        });
    }

    private initiallizeParams(paramTypes: any[]): any[] {
        return paramTypes.map(paramType => {
            if (paramType && paramType.name && !this.isTypePrimitive(paramType.name)) {
                return this.get(paramType);
            }
            return undefined;
        });
    }

    private isTypePrimitive(param: string): boolean {
        return ["string", "boolean", "number", "object"].indexOf(param.toLowerCase()) !== -1;
    }

    public get(identifier: ServiceIdentifier) {
        const servcie = this.findService(identifier);
        if (!servcie) {
            throw new Error(`${identifier} service not found`)
        }
        if (servcie.value) {
            return servcie.value;
        }

        const type = servcie.type;
        if (!type) {
            throw new Error(`Cannot determine a class of the requesting service "${identifier}"`);
        }

        const paramTypes = Reflect.getMetadata('design:paramtypes', type);
        const params: any[] = paramTypes ? this.initiallizeParams(paramTypes) : [];
        const value = new (type.bind.apply(type, [null, ...params]))();
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

    public set(service: ServiceMetadata) {
        this.container.push(service);
    }

    public exist(): boolean {
        return true;
    }

    public registHandler(identifier: Function, handler: Handler) {
        if (this.handlers.get(identifier)) {
            const handlers = this.handlers.get(identifier) || [];
            handlers.push(handler);
            this.handlers.set(identifier, handlers);
        } else {
            this.handlers.set(identifier, [handler]);
        }
    }

    public registRouter(router: RouterHandler) {
        this.routers.push(router);
    }
}