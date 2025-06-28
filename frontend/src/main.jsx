import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BorrowProvider } from "./context/BorrowContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BorrowProvider> 
          <App />
        </BorrowProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
