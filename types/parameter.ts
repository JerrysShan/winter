
export enum ParameterType {
    query,
    body,
    header,
    params,
}

export interface ParameterDesc {
    index: number;
    type: ParameterType;
}