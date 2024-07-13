export interface IDataType {
    name: string;
    description: string;
    parent: string;
}

export interface IHierarchy extends IDataType {
    children?: Array<IDataType>;
}