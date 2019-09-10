export interface StoreItemId extends Number {
    _storeItemIdBrand: number;
}

export default class StoreItemModel {
    id: StoreItemId;
    name: string;
    description: string;
    cost: number;
    itemCount: number;
    expiry?: Date;
}