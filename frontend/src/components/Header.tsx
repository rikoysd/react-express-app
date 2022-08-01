import { FC, useCallback, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../provider/LoginProvider";
import type { User } from "../types/user";
import { styled } from "@mui/material/styles";

type Props = {
  loginFlag: boolean;
  setLoginFlag: (boolean: boolean) => void;
  loginUser: User;
};

export const Header: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { loginFlag, setLoginFlag } = props;
  const login = useContext(LoginContext);

  useEffect(() => {}, [props.loginFlag, props.loginUser]);

  const onClickRegisterUser = () => {
    navigate("/registerUser");
  };

  /**
   * ログイン.
   */
  const onClickLogin = () => {
    navigate("/login");
  };

  /**
   * ログアウト.
   */
  const onClickLogout = useCallback(() => {
    login?.setLoginUser({
      userId: 0,
      mailAddress: "",
      password: "",
    });
    props.setLoginFlag(false);
    navigate("/");
  }, [login?.loginUser]);

  /**
   * 冷蔵庫一覧ページに遷移.
   */
  const onClickRefrigerator = () => {
    navigate("/registerFood");
  };

  /**
   * 献立記録ページに遷移.
   */
  const onClickRecipes = () => {
    navigate("/recordRecipes");
  };

  return (
    <AppBar
      position="static"
      style={{ color: "black", backgroundColor: "#FFFFFF", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            display: "flex",
          }}
        >
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Raku Limiter
          </NavLink>
          {(() => {
            if (props.loginFlag === true) {
              return (
                <div>
                  <Button
                    color="inherit"
                    style={{
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                      marginLeft: "40px",
                    }}
                    onClick={onClickRefrigerator}
                  >
                    冷蔵庫
                  </Button>
                  <Button
                    color="inherit"
                    style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    onClick={onClickRecipes}
                  >
                    今日の献立
                  </Button>
                </div>
              );
            }
          })()}
        </Typography>
        {(() => {
          if (props.loginFlag === false) {
            return (
              <div>
                <Button
                  color="inherit"
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  onClick={onClickRegisterUser}
                >
                  会員登録
                </Button>
                <Button
                  color="inherit"
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  onClick={onClickLogin}
                >
                  ログイン
                </Button>
              </div>
            );
          } else {
            return (
              <SFlex>
                <div>{props.loginUser.mailAddress}</div>
                <Button
                  color="inherit"
                  style={{
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    marginLeft: "20px",
                  }}
                  onClick={onClickLogout}
                >
                  ログアウト
                </Button>
              </SFlex>
            );
          }
        })()}
      </Toolbar>
    </AppBar>
  );
};

const SFlex = styled("div")({
  display: "flex",
  alignItems: "center",
});
