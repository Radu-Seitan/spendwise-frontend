import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Product } from "../shared/types/Product";
import { ProductsApiClient } from "../../api/Clients/ProductsApiClient";
import { ProductModel } from "../../api/Models/ProductModel";

import "./Products.css";

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await ProductsApiClient.getAllAsync();

      const products = res.map((e: ProductModel) => ({ ...e } as Product));
      setProducts(products);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} className={"products-page-container"}>
      {products.map((product: Product, index: number) => (
        <Grid item xs={3} key={`${product.id}-${index}`}>
          <Card className={"products-page-card"}>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                className={"products-page-category"}
              >
                {product.name}
              </Typography>
              <Typography variant="h6" component="div">
                Category: {product.categories.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
