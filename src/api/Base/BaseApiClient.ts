import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const SpendWiseClient = axios.create({
  baseURL: "https://localhost:7270/api/", //http://localhost:8181/
  headers: defaultHeaders,
});
