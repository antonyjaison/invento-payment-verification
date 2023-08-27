import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { unverifiedApi } from "./features/apiSlice.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={unverifiedApi}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
