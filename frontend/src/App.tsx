import { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top";
import { RegisterFood } from "./pages/RegisterFood";
import { RecordRecipes } from "./pages/RecordRecipes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RegisterUser } from "./pages/RegisterUser";
import { Login } from "./pages/Login";
import type { User } from "./types/user";

export const App: FC = () => {
  // ログインフラグ
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  // ログインユーザー
  const [loginUser, setLoginUser] = useState<User>({
    userId: 0,
    mailAddress: "",
    password: "",
  });

  return (
    <BrowserRouter>
      <Header
        loginFlag={loginFlag}
        setLoginFlag={setLoginFlag}
        loginUser={loginUser}
      ></Header>
      <Routes>
        <Route path="/" element={<Top></Top>}></Route>
        <Route
          path="/registerFood"
          element={<RegisterFood loginUser={loginUser}></RegisterFood>}
        ></Route>
        <Route
          path="/recordRecipes"
          element={<RecordRecipes loginUser={loginUser}></RecordRecipes>}
        ></Route>
        <Route
          path="/registerUser"
          element={<RegisterUser></RegisterUser>}
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              loginFlag={loginFlag}
              setLoginFlag={setLoginFlag}
              setLoginUser={setLoginUser}
            ></Login>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};
