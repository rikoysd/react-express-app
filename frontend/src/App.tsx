import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top";
import { RegisterFood } from "./pages/RegisterFood";
import { RecordRecipes } from "./pages/RecordRecipes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Top></Top>}></Route>
        <Route
          path="/registerFood"
          element={<RegisterFood></RegisterFood>}
        ></Route>
        <Route
          path="/recordRecipes"
          element={<RecordRecipes></RecordRecipes>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};
