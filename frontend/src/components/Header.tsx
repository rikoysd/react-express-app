import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export const Header: FC = () => {
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
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          Raku Limiter
        </Typography>
        <Button
          color="inherit"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          会員登録
        </Button>
        <Button
          color="inherit"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          ログイン
        </Button>
      </Toolbar>
    </AppBar>
  );
};
