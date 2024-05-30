import { SpendWiseClient } from "../Base/BaseApiClient";
import { ProductModel } from "../Models/ProductModel";

export const ProductsApiClient = {
  urlPath: "Products",

  getAllAsync(): Promise<ProductModel[]> {
    return SpendWiseClient.get<ProductModel[]>(
      this.urlPath + "/GetProducts"
    ).then((response) => response.data);
  },
};
