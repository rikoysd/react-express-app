import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  const onClickRegisterUser = () => {
    navigate("/registerUser");
  };
  
  const onClickLogin = () => {
    navigate("/login");
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
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
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
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
};
