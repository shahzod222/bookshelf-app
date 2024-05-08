import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./redux/apiSlice.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
