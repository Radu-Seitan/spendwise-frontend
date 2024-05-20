import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import "./AppHeader.css";

export const AppHeader: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters className={"menu-container"}>
          <Button variant="contained" component={Link} to="/">
            <Typography className={"menu-button-text"}>Home</Typography>
          </Button>
          <Button variant="contained" component={Link} to="/categories">
            <Typography className={"menu-button-text"}>Categories</Typography>
          </Button>
          <Button variant="contained" component={Link} to="/upload-receipt">
            <Typography className={"menu-button-text"}>
              Upload receipt
            </Typography>
          </Button>
          <Button variant="contained" component={Link} to="/statistics">
            <Typography className={"menu-button-text"}>Statistics</Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
