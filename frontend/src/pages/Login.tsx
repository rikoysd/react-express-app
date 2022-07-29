import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
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
import { LoginContext, SetLoginContext } from "../provider/LoginProvider";

interface State {
  password: string;
  showPassword: boolean;
}

type Props = {
  setLoginFlag: (boolean: boolean) => void;
};

export const Login: FC<Props> = (props) => {
  // メールアドレス
  const [mail, setMail] = useState<string>("");
  // メールアドレスのエラー
  const [mailError, setMailError] = useState<string>("");
  // パスワードのエラー
  const [passwordError, setPasswordError] = useState<string>("");
  // エラーリスト
  const [errorList, setErrorList] = useState<boolean[]>([]);
  // ログインエラー
  const [loginError, setLoginError] = useState<string>("");
  const { userList, getUserList } = useFetchUser();
  // パスワード
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();
  const setLoginUser = useContext(SetLoginContext);
  const { setLoginFlag } = props;

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
  const onClickLogin = useCallback(async () => {
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

    // パスワードのエラー
    if (values.password === "") {
      setPasswordError("パスワードを入力してください");
      newErrorList.push(true);
    } else {
      setPasswordError("");
    }

    if (newErrorList.length > 0) {
      newErrorList = [];
      setErrorList(newErrorList);
      return;
    }

    // 入力した内容で該当のユーザーを取得する
    await axios
      .post("http://localhost:3001/api/post/userById", {
        mailAddress: mail,
        password: values.password,
      })
      .then((response) => {
        if (response.data.length === 0) {
          setLoginError("メールアドレスとパスワードが一致しませんでした");
        } else {
          // ユーザーをグローバルステートにセット
          setLoginUser(response.data);
          setLoginError("");
          props.setLoginFlag(true);

          // 入力項目をクリアにする
          setMail("");
          setValues({
            password: "",
            showPassword: false,
          });
          navigate("/registerFood");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError("ログインできませんでした");
      });

    setErrorList([]);
  }, [userList, mail, values.password]);

  return (
    <SContainer>
      <div>
        <h2 style={{ textAlign: "center" }}>ログイン</h2>
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
        </SItemBlock>
        <SError style={{ textAlign: "center" }}>{loginError}</SError>
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
            onClick={onClickLogin}
          >
            ログイン
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
