import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { GlobalProvider } from "./GlobalContext/Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
