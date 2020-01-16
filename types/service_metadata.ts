import { ServiceIdentifier } from './service_identifier';

export interface ServiceMetaData {
    type: Function;
    value?: any;
    transient?: boolean;
    id?: ServiceIdentifier;
}