import { Box, Button, Divider, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { Category } from "../shared/types/Category";
import { CategoriesApiClient } from "../../api/Clients/CategoriesApiClients";
import { CategoryModel } from "../../api/Models/CategoryModel";

import "./Categories.css";
import { AddCategoryPopup } from "./AddCategoryPopup";

export const Categories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchCategories = async () => {
    try {
      const res = await CategoriesApiClient.getAllAsync();

      const categories = res.map((e: CategoryModel) => ({ ...e } as Category));
      setCategories(categories);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteCategory = async (id?: number) => {
    if (!id) return;

    try {
      await CategoriesApiClient.deleteOneAsync(id);
      const newCategories = categories.filter((el) => el.id !== id);
      setCategories(newCategories);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box>
      <Box className={"new-category-section"}>
        <Box className={"categories-title-text"}>Add a new category</Box>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{ color: "#fff" }}
        >
          <AddIcon fontSize="large" />
        </Button>
      </Box>

      <Divider />

      <Box className={"categories-list-section"}>
        <Box className={"categories-title-text"}>Current categories</Box>
        <Box className={"categories-list"}>
          {categories.map((category: Category, index: number) => (
            <Box key={`${category.id}-${index}`} className={"category"}>
              <Box className={"category-text-container"}>{category.name}</Box>
              <IconButton onClick={() => deleteCategory(category.id)}>
                <CancelIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      <AddCategoryPopup
        open={open}
        onClose={handleClose}
        onEditing={(category: Category) => {
          setCategories([...categories, category]);
        }}
      />
    </Box>
  );
};
