import { FC, useEffect, useState } from "react";

import "./EditCategoryPopup.css";
import { Category } from "../../shared/types/Category";
import { CategoryModel } from "../../../api/Models/CategoryModel";
import { CategoriesApiClient } from "../../../api/Clients/CategoriesApiClients";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditCategoryPopupProps {
  open: boolean;
  onClose: () => void;
  onEditing: (category: Category) => void;
  category: Category;
}

export const EditCategoryPopup: FC<EditCategoryPopupProps> = ({
  open,
  onClose,
  onEditing,
  category,
}: EditCategoryPopupProps) => {
  const [categoryName, setCategoryName] = useState(category.name);

  const updateCategory = async () => {
    const model: CategoryModel = { ...category, name: categoryName };

    try {
      const res = await CategoriesApiClient.updateOneAsync(model);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    const categoryModel = await updateCategory();
    const newCategory = categoryModel as Category;
    onEditing(newCategory);
    handleClose();
  };

  useEffect(() => {
    setCategoryName(category.name);
  }, [category]);

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle fontSize={24}>Edit category</DialogTitle>
      <DialogContent className={"edit-category-modal-content"}>
        <TextField
          fullWidth
          label="Category name"
          value={categoryName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCategoryName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions className={"edit-category-modal-actions"}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!categoryName || category.name === categoryName}
          className="edit-category-save-button"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
