import { createRoot } from "react-dom/client";
import { App } from "./App";
import { FoodProvider } from "./provider/FoodProvider";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <FoodProvider>
    <App />
  </FoodProvider>
);
