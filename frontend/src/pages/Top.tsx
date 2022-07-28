import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import top from "../img/top.png";
import { hover } from "@testing-library/user-event/dist/hover";

export const Top: FC = () => {
  const navigate = useNavigate();

  /**
   * 食材の登録ページに遷移.
   */
  const onClickRegisterFood = () => {
    navigate("/registerFood");
  };

  /**
   * 献立の記録ページに遷移.
   */
  const onClickRecordRecipes = () => {
    navigate("/recordRecipes");
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
            onClick={onClickRegisterFood}
          >
            食材を登録する
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
            onClick={onClickRecordRecipes}
          >
            今日の献立を記録する{" "}
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
