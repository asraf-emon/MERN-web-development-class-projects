import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ContactProvider } from "./context/ContactContext";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContactProvider>
      <Router>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          theme="colored"
          pauseOnHover={false}
        />
      </Router>
    </ContactProvider>
  </React.StrictMode>
);
