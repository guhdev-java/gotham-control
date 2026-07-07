import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { GothamProvider } from "./state/GothamContext";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GothamProvider>
      <App />
    </GothamProvider>
  </StrictMode>
);
