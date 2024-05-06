import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "./utils/register-sw";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

registerSW("/sw.js", {
  scope: "/",
  type: "module",
})
  .then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(<h1>Unsupported Browser</h1>);
  });
