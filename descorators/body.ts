import 'reflect-metadata';
import { METADATA_PARAM } from '../constants';
import { ParameterDesc, ParameterType } from '../types/parameter';

export function Body() {
    return (target: any, propertyKey: string, paramIndex: number) => {
        let paramsDefine: ParameterDesc[] = [];
        if (Reflect.hasOwnMetadata(METADATA_PARAM, target, propertyKey)) {
            paramsDefine = Reflect.getMetadata(METADATA_PARAM, target, propertyKey);
        }

        paramsDefine.push({ index: paramIndex, type: ParameterType.body });
        Reflect.defineMetadata(METADATA_PARAM, paramsDefine, target, propertyKey)
    }
}