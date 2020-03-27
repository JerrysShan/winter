import { ContainerInstance } from './container_instance';
import { ServiceIdentifier } from './types/service_identifier';
import { ServiceMetadata } from './types/service_metadata';
import { Handler } from './types/handler';
import { RouterHandler } from './types/router_handler';

export default class Container {
    private static containerInstance = new ContainerInstance();

    public static get(identifier: ServiceIdentifier) {
        return Container.containerInstance.get(identifier);
    }

    public static set(service: ServiceMetadata) {
        return Container.containerInstance.set(service);
    }

    public static registHandler(identifier: Function, handler: Handler) {
        return Container.containerInstance.registHandler(identifier, handler);
    }

    public static registRouter(router: RouterHandler) {
        return Container.containerInstance.registRouter(router);
    }

    public static get routers() {
        return Container.containerInstance.routers;
    }
}