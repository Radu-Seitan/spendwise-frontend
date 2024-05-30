import { Category } from "../../components/shared/types/Category";
import { SpendWiseClient } from "../Base/BaseApiClient";
import { SaveCartModel } from "../Models/SaveCartModel";

export const ReceiptsApiClient = {
  urlPath: "Receipts", //"receipt"

  scanReceipt(image: File, categories: Category[]) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("categories", JSON.stringify(categories));

    return SpendWiseClient.post(this.urlPath + "/ScanReceipt", formData, {
      // /scan
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => response.data);
  },

  saveCart(model: SaveCartModel) {
    return SpendWiseClient.post(this.urlPath + "/SaveCart", model).then(
      //save
      (response) => response.data
    );
  },
};
