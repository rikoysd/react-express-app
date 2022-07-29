import { ChangeEvent, FC, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Login: FC = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>ログイン</h2>
      <SItemBlock>
        <label htmlFor="mail">
          <SItem>メールアドレス</SItem>
          <SError>{mailError}</SError>
          <TextField
            id="mail"
            variant="outlined"
            value={mail}
            onChange={onChangeMail}
            size="small"
            style={{ width: "300px" }}
          />
        </label>
      </SItemBlock>
      <SItemBlock>
        <label htmlFor="password">
          <SItem>パスワード</SItem>
          <SError>{passwordError}</SError>
          <TextField
            id="password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
            size="small"
            style={{ width: "300px" }}
          />
        </label>
      </SItemBlock>
      <Button
        style={{
          color: "black",
          backgroundColor: "#FFAA2C",
          fontFamily: "'Zen Maru Gothic', sans-serif",
          boxShadow: "none",
          width: "180px",
          height: "45px",
          borderRadius: "5px",
        }}
        variant="contained"
        // onClick={onClickRegisterFood}
      >
        食材を登録する
      </Button>
    </div>
  );
};

const SError = styled("div")({
  color: "#DA3737",
  fontSize: "13px",
  marginBottom: "5px",
});

const SItem = styled("div")({
  marginBottom: "8px",
});

const SItemBlock = styled("div")({
  margin: "20px 0",
});
