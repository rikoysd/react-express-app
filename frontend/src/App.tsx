import { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top";
import { RegisterFood } from "./pages/RegisterFood";
import { RecordRecipes } from "./pages/RecordRecipes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RegisterUser } from "./pages/RegisterUser";
import { Login } from "./pages/Login";

export const App: FC = () => {
  // ログインフラグ
  const [loginFlag, setLoginFlag] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Header loginFlag={loginFlag} setLoginFlag={setLoginFlag}></Header>
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
        <Route
          path="/registerUser"
          element={<RegisterUser></RegisterUser>}
        ></Route>
        <Route
          path="/login"
          element={<Login setLoginFlag={setLoginFlag}></Login>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};
