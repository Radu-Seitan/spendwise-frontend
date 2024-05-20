import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export const Home: FC = () => {
  return (
    <Box>
      <Box className={"background-image"}></Box>
      <Box className={"title-logo-container"}>
        <img
          src="../../asset/logo.png"
          alt="SpendWise Logo"
          className={"title-logo"}
        />
      </Box>
      <Grid container>
        <Grid item sm={6} md={4}>
          <Card className={"card"}>
            <img
              src="/asset/categories-logo.png"
              alt="Categories"
              className={"card-image"}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                className={"section-title"}
              >
                Categories
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/categories"
                variant="contained"
                className={"card-button"}
              >
                <Typography>Go to</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item sm={6} md={4}>
          <Card className={"card"}>
            <img
              src="/asset/receipt-logo.png"
              alt="Receipts"
              className={"card-image"}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                className={"section-title"}
              >
                Receipts
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/upload-receipt"
                variant="contained"
                className={"card-button"}
              >
                <Typography>Go to</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={"card"}>
            <img
              src="/asset/statistics-logo.webp"
              alt="Statistics"
              className={"card-image"}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"center"}
                className={"section-title"}
              >
                Statistics
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/statistics"
                variant="contained"
                className={"card-button"}
              >
                <Typography>Go to</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
