import { createRoot } from "react-dom/client";
import App from "./App";

console.log("Hello World!");

const documentRoot = document.querySelector("#root");

if (documentRoot) {
  const root = createRoot(documentRoot);
  root.render(<App />);
}
