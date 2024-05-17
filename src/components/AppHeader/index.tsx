import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

import "./AppHeader.css";

export const AppHeader: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters className={"menu-container"}>
          <Button variant="contained" href="/">
            <Typography className={"menu-button-text"}>Home</Typography>
          </Button>
          <Button variant="contained" href="/categories">
            <Typography className={"menu-button-text"}>Categories</Typography>
          </Button>
          <Button variant="contained" href="/upload-receipt">
            <Typography className={"menu-button-text"}>
              Upload receipt
            </Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
