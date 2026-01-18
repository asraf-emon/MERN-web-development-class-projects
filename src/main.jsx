import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContactProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          theme="colored"
          pauseOnHover={false}
        />
      </BrowserRouter>
    </ContactProvider>
  </StrictMode>,
);
