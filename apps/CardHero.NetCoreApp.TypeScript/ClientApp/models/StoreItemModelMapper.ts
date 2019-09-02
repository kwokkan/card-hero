import IMapper from "../utils/mapper";
import StoreItemModel from "./StoreItemModel";

export default class StoreItemModelMapper implements IMapper<StoreItemModel> {
    from(o?: any): StoreItemModel {
        if (!o) return null;

        const model = new StoreItemModel();
        model.cost = o.cost;
        model.description = o.description;
        model.expiry = o.expiry;
        model.id = o.id;
        model.itemCount = o.itemCount;
        model.name = o.name;

        return model;
    }
}