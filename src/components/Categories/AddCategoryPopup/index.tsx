import { FC, useState } from "react";

import "./AddCategoryPopup.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Category } from "../../shared/types/Category";
import { CategoryModel } from "../../../api/Models/CategoryModel";
import { CategoriesApiClient } from "../../../api/Clients/CategoriesApiClients";

interface AddCategoryPopupProps {
  open: boolean;
  onClose: () => void;
  onEditing: (category: Category) => void;
}

export const AddCategoryPopup: FC<AddCategoryPopupProps> = ({
  open,
  onClose,
  onEditing,
}: AddCategoryPopupProps) => {
  const [categoryName, setCategoryName] = useState("");

  const createCategory = async () => {
    const model: CategoryModel = { name: categoryName };

    try {
      const res = await CategoriesApiClient.createOneAsync(model);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  const handleSave = async () => {
    const categoryModel = await createCategory();
    const newCategory = categoryModel as Category;
    onEditing(newCategory);
    handleClose();
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
      <DialogTitle fontSize={24}>Create a new category</DialogTitle>
      <DialogContent className={"add-category-modal-content"}>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCategoryName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions className={"add-category-modal-actions"}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!categoryName}
          className="save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
