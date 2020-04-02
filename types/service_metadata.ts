import { ServiceIdentifier } from './service_identifier';

export interface ServiceMetadata {
    type?: Function;
    value?: any;
    transient?: boolean;
    id?: ServiceIdentifier;
}