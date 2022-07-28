import { FC } from "react";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

export const Footer: FC = () => {
  return (
    <SFooter>
      <div>
        <SFlex style={{ alignItems: "center" }}>
          <h2 style={{ marginRight: "10px" }}>Raku Limiter</h2>
          <div>- 冷蔵庫管理アプリ</div>
        </SFlex>
        <SFlex style={{ justifyContent: "center" }}>
          <SItem>
            <NavLink to="/">ホーム</NavLink>
          </SItem>
          <SItem>
            <div>会員登録</div>
          </SItem>
          <SItem>
            <div>ログイン</div>
          </SItem>
        </SFlex>
      </div>
    </SFooter>
  );
};

const SFooter = styled("div")({
  borderTop: "solid 1px",
  display: "flex",
  justifyContent: "center",
  padding: "10px",
});

const SFlex = styled("div")({
  display: "flex",
});

const SItem = styled("div")({
  marginRight: "15px",
});
