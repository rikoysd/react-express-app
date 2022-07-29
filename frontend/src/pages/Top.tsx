import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import top from "../img/top.png";

export const Top: FC = () => {
  const navigate = useNavigate();

  /**
   * ユーザー登録ページに遷移.
   */
  const onClickRegisterUser = () => {
    navigate("/registerUser");
  };

  /**
   * ログインページに遷移.
   */
  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <SContainer>
      <STitleArea>
        <div style={{ textAlign: "center" }}>冷蔵庫管理アプリ</div>
        <STitle>Raku Limiter</STitle>
        <div>
          <img style={{ width: "370px" }} src={top} alt="girl" />
        </div>
      </STitleArea>
      <div>
        <div>
          <Button
            style={{
              color: "black",
              backgroundColor: "#FFAA2C",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "none",
              width: "230px",
              height: "45px",
              borderRadius: "5px",
              marginBottom: "40px",
            }}
            variant="contained"
            onClick={onClickRegisterUser}
          >
            会員登録
          </Button>
        </div>
        <div>
          <Button
            style={{
              color: "black",
              backgroundColor: "#FFAA2C",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "none",
              width: "230px",
              height: "45px",
              borderRadius: "5px",
            }}
            variant="contained"
            onClick={onClickLogin}
          >
            ログイン
          </Button>
        </div>
      </div>
    </SContainer>
  );
};

const SContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const STitle = styled("div")({
  fontSize: "35px",
  textAlign: "center",
});

const STitleArea = styled("div")({
  marginRight: "30px",
});
