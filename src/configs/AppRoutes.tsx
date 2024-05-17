import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "../components/Home";
import { Categories } from "../components/Categories";
import { UploadReceipt } from "../components/UploadReceipt";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<App />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/categories"} element={<Categories />} />
        <Route path={"/upload-receipt"} element={<UploadReceipt />} />
      </Route>
    </Routes>
  );
};
