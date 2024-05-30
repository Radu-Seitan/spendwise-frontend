import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Category } from "../shared/types/Category";
import { CategoriesApiClient } from "../../api/Clients/CategoriesApiClients";
import { CategoryModel } from "../../api/Models/CategoryModel";
import { ScanReceiptPopup } from "./ScanReceiptPopup";
import { CategorizedProduct } from "../shared/types/CategorizedProduct";
import { ReceiptsApiClient } from "../../api/Clients/ReceiptsApiClient";
import { CategorizedProductModel } from "../../api/Models/CategorizedProductModel";
import { useNavigate } from "react-router-dom";

import "./UploadReceipt.css";
import { SaveCartModel } from "../../api/Models/SaveCartModel";

export const UploadReceipt: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [scannedImage, setScannedImage] = useState<File | null>(null);
  const [categorizedProducts, setCategorizedProducts] = useState<
    CategorizedProduct[]
  >([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await CategoriesApiClient.getAllAsync();

      const categories = res.map((e: CategoryModel) => ({ ...e } as Category));
      setCategories(categories);
      setIsSetupComplete(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  const saveProductsInReceipt = async () => {
    try {
      const model: SaveCartModel = {
        date: new Date(),
        categoryProducts: categorizedProducts.map(
          (el) => ({ ...el } as CategorizedProductModel)
        ),
      };
      const res = await ReceiptsApiClient.saveCart(model);

      navigate("/products");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return !isSetupComplete ? (
    <Box className={"spinner-layout"}>
      <CircularProgress />
    </Box>
  ) : (
    <Box>
      <Box className={"upload-receipt-section"}>
        <Box className={"upload-receipt-title-text"}>Upload a receipt</Box>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          <UploadIcon fontSize="large" color="secondary" />
        </Button>
      </Box>

      <Divider />
      {scannedImage && (
        <>
          <Box className={"uploaded-image-section"}>
            <Box>
              <Box className={"uploaded-image-container"}>
                <Box
                  className={"upload-receipt-title-text"}
                  textAlign={"center"}
                >
                  Uploaded image
                </Box>
                <img
                  src={URL.createObjectURL(scannedImage)}
                  className={"uploaded-image"}
                />
              </Box>
            </Box>
            <Box className={"categorized-products-section"}>
              <Box className={"upload-receipt-title-text"}>
                Categorized Products
              </Box>
              <Button
                onClick={() => saveProductsInReceipt()}
                variant="contained"
                className={"save-products-button"}
              >
                Save products
              </Button>
              {categorizedProducts.map((category) => (
                <Box key={category.id} className={"category-box"}>
                  <Typography variant="h6" className={"category-name"}>
                    {category.name}
                  </Typography>
                  <Box className={"products-list"}>
                    {category.products.map((product, index) => (
                      <Box key={index} className={"product-box"}>
                        <Typography className={"product-name"}>
                          {product.name}
                        </Typography>
                        <Typography className={"product-quantity"}>
                          Quantity: {product.quantity}
                        </Typography>
                        <Typography className={"product-price"}>
                          Price: ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
      <ScanReceiptPopup
        open={open}
        onClose={handleClose}
        categories={categories}
        onScanning={(file: File, categorizedProducts: CategorizedProduct[]) => {
          setScannedImage(file);
          setCategorizedProducts(categorizedProducts);
        }}
      />
    </Box>
  );
};
