import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useFetchRefrigerator } from "../hooks/useFetchRefrigerator";
import { format } from "date-fns";
import { FoodList } from "../components/FoodList";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

type Props = {
  loginUser: User;
};

export const RegisterFood: FC<Props> = (props) => {
  // 購入日
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(new Date());
  // 名前
  const [name, setName] = useState<string>("");
  // 名前のエラー
  const [nameError, setNameError] = useState<string>("");
  // 数量
  const [quantity, setQuantity] = useState<string>("0");
  // 数量の選択
  const [qSelect, setQSelect] = useState<string>("1");
  // 賞味期限・消費期限
  const [bestBefore, setBestBefore] = useState<Date | null>(new Date());
  const {
    foodList,
    getFoodList,
    getAllFoodList,
    allFoodList,
    getUserFoodList,
    userFoodList,
  } = useFetchRefrigerator();
  // 購入日エラー
  const [purchaseDateError, setPurchaseDateError] = useState<string>("");
  // 賞味期限エラー
  const [bestBeforeError, setBestBeforeError] = useState<string>("");
  // 登録エラー
  const [registerError, setRegisterError] = useState<string>("");
  // エラーリスト
  const [errorList, setErrorList] = useState<boolean[]>([]);
  const { loginUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginUser.userId) {
      getFoodList(props.loginUser.userId);
      getAllFoodList();
    } else {
      navigate("/login");
    }
  }, [bestBefore, purchaseDate]);

  /**
   * 購入日を選択.
   * @param new Value
   */
  const onChangePurchaseDate = (newValue: Date | null) => {
    if (newValue?.toString() === "Invalid Date") {
      setPurchaseDateError("不正な日付です");
    } else if (newValue === null) {
      setPurchaseDate(new Date());
      setPurchaseDateError("");
    } else {
      setPurchaseDate(newValue);
      setPurchaseDateError("");
    }
  };

  /**
   * 食材名の入力.
   * @param e
   */
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  /**
   * 数量の選択.
   * @param e
   */
  const onChangeQSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setQSelect(e.target.value);
  };

  /**
   * 数量の入力.
   * @param e
   */
  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(String(e.target.value));
  };

  /**
   * 賞味期限の入力.
   * @param newValue
   */
  const onChangeBestBefore = (newValue: Date | null) => {
    if (newValue?.toString() === "Invalid Date") {
      setBestBeforeError("不正な日付です");
    } else if (newValue === null) {
      setBestBefore(new Date());
      setBestBeforeError("");
    } else {
      setBestBefore(newValue);
      setBestBeforeError("");
    }
  };

  /**
   * 入力項目をクリアにする.
   */
  const onClickClear = () => {
    setPurchaseDate(new Date());
    setName("");
    setQSelect("1");
    setQuantity("0");
    setBestBefore(new Date());
    setPurchaseDateError("");
    setNameError("");
    setBestBeforeError("");
    setRegisterError("");
  };

  /**
   * 食材を登録する.
   */
  const onClickRegisterFood = useCallback(async () => {
    // エラー処理
    const newErrorList = [...errorList];

    if (purchaseDate?.toString() === "Invalid Date") {
      setPurchaseDateError("不正な日付です");
      newErrorList.push(true);
    } else {
      setPurchaseDateError("");
    }

    if (name === "") {
      setNameError("食材名を入力してください");
      newErrorList.push(true);
    } else {
      setNameError("");
    }

    if (bestBefore?.toString() === "Invalid Date") {
      setBestBeforeError("不正な日付です");
      newErrorList.push(true);
    } else {
      setBestBeforeError("");
    }

    if (newErrorList.length !== 0) {
      setRegisterError("正しく入力されていない箇所があります");
      return;
    }

    // id採番
    let id = 0;
    let idList = [];
    if (allFoodList.length === 0) {
      id = 1;
    } else {
      for (let food of allFoodList) {
        idList.push(food.foodId);
      }
      id = Math.max(...idList) + 1;
    }

    // DBに登録する用の型に変換
    const newPurchaseDate = format(Number(purchaseDate), "yyyy-MM-dd");

    const newBestBefore = format(Number(bestBefore), "yyyy-MM-dd");

    await axios
      .post("http://localhost:3001/api/post/foodList", {
        id: id,
        name: name,
        purchaseDate: newPurchaseDate,
        qSelect: Number(qSelect),
        quantity: Number(quantity),
        bestBefore: newBestBefore,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setRegisterError("登録できませんでした");
      });

    // id採番
    let id2 = 0;
    let idList2 = [];
    if (userFoodList.length === 0) {
      id2 = 1;
    } else {
      for (let food of userFoodList) {
        idList2.push(food.foodId);
      }
      id2 = Math.max(...idList) + 1;
    }

    await axios
      .post("http://localhost:3001/api/post/user_food", {
        userId: props.loginUser.userId,
        foodId: id,
        id: id2,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setRegisterError("登録できませんでした");
      });

    // 入力項目をクリアにする
    setPurchaseDate(new Date());
    setName("");
    setQSelect("1");
    setQuantity("0");
    setBestBefore(new Date());
  }, [purchaseDate, bestBefore, name, allFoodList, foodList, userFoodList]);

  return (
    <SContainer>
      <FoodList bestBefore={bestBefore} loginUser={props.loginUser}></FoodList>
      <div>
        <SForm>
          <div>
            <SItemBlock>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <label htmlFor="purchaseDate">
                  <SItem>購入日（必須）</SItem>
                  <SError>{purchaseDateError}</SError>
                  <DesktopDatePicker
                    inputFormat="yyyy/MM/dd"
                    value={purchaseDate}
                    onChange={onChangePurchaseDate}
                    renderInput={(params) => (
                      <TextField {...params} style={{ width: "300px" }} />
                    )}
                  />
                </label>
              </LocalizationProvider>
            </SItemBlock>
            <SItemBlock>
              <label htmlFor="name">
                <SItem>食材名（必須）</SItem>
                <SError>{nameError}</SError>
                <TextField
                  id="name"
                  variant="outlined"
                  value={name}
                  onChange={onChangeName}
                  size="small"
                  style={{ width: "300px" }}
                />
              </label>
            </SItemBlock>
            <SItemBlock>
              <SItem>数量</SItem>
              <RadioGroup defaultValue="1" onChange={onChangeQSelect}>
                <FormControlLabel
                  value="1"
                  control={<Radio size="small"></Radio>}
                  label="個数"
                  checked={qSelect === "1"}
                ></FormControlLabel>
                <FormControlLabel
                  value="2"
                  control={<Radio size="small"></Radio>}
                  label="グラム数"
                  checked={qSelect === "2"}
                ></FormControlLabel>
              </RadioGroup>
              {(() => {
                if (qSelect === "1") {
                  return (
                    <OutlinedInput
                      id="outlined-basic"
                      endAdornment={
                        <InputAdornment position="end">個</InputAdornment>
                      }
                      style={{ width: "300px" }}
                      size="small"
                      value={quantity}
                      onChange={onChangeQuantity}
                    />
                  );
                } else {
                  return (
                    <OutlinedInput
                      id="outlined-basic"
                      endAdornment={
                        <InputAdornment position="end">ｇ</InputAdornment>
                      }
                      style={{ width: "300px" }}
                      size="small"
                      value={quantity}
                      onChange={onChangeQuantity}
                    />
                  );
                }
              })()}
            </SItemBlock>
            <SItemBlock>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <label htmlFor="purchaseDate">
                  <SItem>賞味期限・消費期限</SItem>
                  <SError>{bestBeforeError}</SError>
                  <DesktopDatePicker
                    inputFormat="yyyy/MM/dd"
                    value={bestBefore}
                    onChange={onChangeBestBefore}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          width: "300px",
                        }}
                      />
                    )}
                  />
                </label>
              </LocalizationProvider>
            </SItemBlock>
          </div>
        </SForm>
        <SForm>
          <div>
            <SError style={{ textAlign: "center" }}>{registerError}</SError>
            <SButtonPosition>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#FEE6C2",
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  boxShadow: "none",
                  marginRight: "20px",
                  height: "45px",
                  width: "180px",
                  borderRadius: "5px",
                }}
                variant="contained"
                onClick={onClickClear}
              >
                クリア
              </Button>
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
                onClick={onClickRegisterFood}
              >
                食材を登録する
              </Button>
            </SButtonPosition>
          </div>
        </SForm>
      </div>
    </SContainer>
  );
};

const SButtonPosition = styled("div")({
  marginTop: "30px",
  display: "flex",
});

const SContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "60px 0",
});

const SError = styled("div")({
  color: "#DA3737",
  fontSize: "13px",
  marginBottom: "5px",
});

const SForm = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 60px",
  padding: "0 40px",
});

const SItem = styled("div")({
  marginBottom: "8px",
});

const SItemBlock = styled("div")({
  margin: "20px 0",
});
