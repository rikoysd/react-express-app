import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFetchUser } from "../hooks/useFetchUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

interface State {
  password: string;
  showPassword: boolean;
}

export const RegisterUser: FC = () => {
  // メールアドレス
  const [mail, setMail] = useState<string>("");
  // メールアドレスのエラー
  const [mailError, setMailError] = useState<string>("");
  // パスワードのエラー
  const [passwordError, setPasswordError] = useState<string>("");
  // エラーリスト
  const [errorList, setErrorList] = useState<boolean[]>([]);
  // 登録エラー
  const [registerError, setRegisterError] = useState<string>("");
  const { userList, getUserList } = useFetchUser();
  // パスワード
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, [errorList]);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /**
   * メールアドレス入力.
   * @param e
   */
  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  /**
   * ユーザーを登録する.
   */
  const onClickRegisterUser = useCallback(async () => {
    let newErrorList = [...errorList];
    // エラー処理
    // メールアドレスのエラー
    if (mail === "") {
      setMailError("メールアドレスを入力してください");
      newErrorList.push(true);
    } else if (mail.indexOf("@") === -1) {
      setMailError("正しい形式で入力してください");
      newErrorList.push(true);
    } else {
      setMailError("");
    }

    // メールアドレス重複エラー
    if (userList.length !== 0) {
      let sameAddress = "";
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].mailAddress === mail) {
          sameAddress = mail;
        }
      }

      if (sameAddress !== "") {
        setMailError("このメールアドレスは既に登録されています");
        newErrorList.push(true);
      } else {
        setMailError("");
      }
    }

    // パスワードのエラー
    // 正規表示を定義(※英語小文字・大文字、数字、記号(.?/-)をそれぞれ1つ以上使用して設定)
    const regex = /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,16}$/;
    if (values.password === "") {
      setPasswordError("パスワードを入力してください");
      newErrorList.push(true);
    } else if (values.password.length < 8 || values.password.length > 16) {
      setPasswordError("パスワードは8文字以上16文字以内で設定してください");
      newErrorList.push(true);
    } else if (!regex.test(values.password)) {
      setPasswordError("要件を満たしていません");
      newErrorList.push(true);
    } else {
      setPasswordError("");
    }

    if (newErrorList.length > 0) {
      newErrorList = [];
      setErrorList(newErrorList);
      return;
    }

    // 登録する
    // id採番
    let userId = 0;
    let idList: Array<number> = [];
    if (userList.length === 0) {
      userId = 1;
    } else {
      for (let user of userList) {
        idList.push(user.userId);
      }
      userId = Math.max(...idList) + 1;
    }

    await axios
      .post("http://localhost:3001/api/post/user", {
        userId: userId,
        mailAddress: mail,
        password: values.password,
      })
      .then((response) => {
        console.log(response);
        // 入力項目をクリアにする
        setMail("");
        setValues({
          password: "",
          showPassword: false,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setRegisterError("登録できませんでした");
      });

    setErrorList([]);
  }, [userList, mail, values.password]);

  return (
    <SContainer>
      <div>
        <h2 style={{ textAlign: "center" }}>会員登録</h2>
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
          <SExample>例：rakus@gmail.com</SExample>
        </SItemBlock>
        <SItemBlock>
          <label htmlFor="password">
            <SItem>パスワード</SItem>
            <SError>{passwordError}</SError>
            <TextField
              id="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange("password")}
              size="small"
              style={{ width: "300px" }}
              type={values.showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>
          <SExample>
            <div>例：Rakus123?</div>
            <div>英語小文字・大文字、数字、記号(.?/-)を各1つ以上</div>
          </SExample>
        </SItemBlock>
        <SError style={{ textAlign: "center" }}>{registerError}</SError>
        <SPosition>
          <Button
            style={{
              color: "black",
              backgroundColor: "#FFAA2C",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              boxShadow: "none",
              width: "180px",
              height: "45px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
            variant="contained"
            onClick={onClickRegisterUser}
          >
            登録する
          </Button>
        </SPosition>
      </div>
    </SContainer>
  );
};

const SContainer = styled("div")({
  margin: "60px 0",
  display: "flex",
  justifyContent: "center",
});

const SError = styled("div")({
  color: "#DA3737",
  fontSize: "13px",
  marginBottom: "5px",
});

const SExample = styled("div")({
  color: "#C2C2C2",
  fontSize: "13px",
  marginTop: "5px",
});

const SItem = styled("div")({
  marginBottom: "8px",
});

const SItemBlock = styled("div")({
  margin: "20px 0",
});

const SPosition = styled("div")({
  display: "flex",
  justifyContent: "center",
});
