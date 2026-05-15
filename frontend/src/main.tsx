import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "@/assets/global-styles/app.css";

import { store } from "@/store/index";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
