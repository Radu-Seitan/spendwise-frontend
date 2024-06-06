import { SpendWiseClient } from "../Base/BaseApiClient";
import { CategoryModel } from "../Models/CategoryModel";
import { CategorySpendingModel } from "../Models/CategorySpendingModel";

export const CategoriesApiClient = {
  urlPath: "Categories",

  getAllAsync(): Promise<CategoryModel[]> {
    return SpendWiseClient.get<CategoryModel[]>(this.urlPath).then(
      (response) => response.data
    );
  },

  getOneAsync(id: number): Promise<CategoryModel> {
    return SpendWiseClient.get<CategoryModel>(
      this.urlPath + "/GetCategory/" + id // this.urlPath + "/" + id
    ).then((response) => response.data);
  },

  createOneAsync(model: CategoryModel): Promise<CategoryModel> {
    return SpendWiseClient.post<CategoryModel>(
      this.urlPath + "/CreateCategory", // this.urlPath
      model
    ).then((response) => response.data);
  },

  updateOneAsync(model: CategoryModel): Promise<CategoryModel> {
    return SpendWiseClient.put<CategoryModel>(
      this.urlPath + "/" + model.id,
      model
    ).then((response) => response.data);
  },

  deleteOneAsync(id: number): Promise<any> {
    return SpendWiseClient.delete(this.urlPath + "/" + id).then(
      (response) => response.data
    );
  },

  getSpendingAsync(): Promise<CategorySpendingModel[]> {
    //Promise<SpendingModel>
    return SpendWiseClient.get<CategorySpendingModel[]>( //get<SpendingModel>
      this.urlPath + "/GetCategoriesSpending" // this.urlPath + "/totalSpent"
    ).then((response) => response.data);
  },
};
