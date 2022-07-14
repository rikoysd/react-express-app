import { ChangeEvent, FC, useState } from "react";
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

export const RegisterFood: FC = () => {
  // 購入日
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(new Date());
  // 名前
  const [name, setName] = useState<string>("");
  // 名前のエラー
  const [nameError, setNameError] = useState<string>("");
  // 数量
  const [quantity, setQuantity] = useState<number>(0);
  // 数量の選択
  const [qSelect, setQSelect] = useState<string>("1");
  // 賞味期限・消費期限
  const [bestBefore, setBestBefore] = useState<Date | null>(new Date());
  // エラーフラグ
  const [flag, setFlag] = useState<boolean>(false);

  /**
   * 購入日を選択.
   * @param e
   */
  const onChangePurchaseDate = (newValue: Date | null) => {
    // console.log(newValue);
    setPurchaseDate(newValue);
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
    setQuantity(Number(e.target.value));
  };

  /**
   * 賞味期限の入力.
   * @param newValue
   */
  const onChangeBestBefore = (newValue: Date | null) => {
    setBestBefore(newValue);
  };

  /**
   * 入力項目をクリアにする.
   */
  const onClickClear = () => {
    setPurchaseDate(new Date());
    setName("");
    setQSelect("1");
    setQuantity(0);
    setBestBefore(new Date());
  };

  /**
   * 食材を登録する.
   */
  const onClickRegisterFood = () => {
    // エラー処理
    if (purchaseDate === null) {
      setPurchaseDate(new Date());
    }
    if (name === "") {
      setNameError("食材名を入力してください");
      setFlag(true);
    }

    axios
      .post("http://localhost:3001/api", {
        id: -1,
        name: name,
        purchaseDate: purchaseDate,
        qSelect: Number(qSelect),
        quantity: quantity,
        bestBefore: bestBefore,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <label htmlFor="purchaseDate">
          <div>購入日</div>
          <DesktopDatePicker
            inputFormat="MM/dd/yyyy"
            value={purchaseDate}
            onChange={onChangePurchaseDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </label>
      </LocalizationProvider>
      <label htmlFor="name">
        <div>食材名（必須）</div>
        <div>{nameError}</div>
        <input type="text" id="name" value={name} onChange={onChangeName} />
      </label>
      <div>数量</div>
      <RadioGroup defaultValue="1" onChange={onChangeQSelect}>
        <FormControlLabel
          value="1"
          control={<Radio></Radio>}
          label="個数"
          checked={qSelect === "1"}
        ></FormControlLabel>
        <FormControlLabel
          value="2"
          control={<Radio></Radio>}
          label="グラム数"
          checked={qSelect === "2"}
        ></FormControlLabel>
      </RadioGroup>
      {(() => {
        if (qSelect === "1") {
          return (
            <OutlinedInput
              id="outlined-basic"
              endAdornment={<InputAdornment position="end">個</InputAdornment>}
              size="small"
              value={quantity}
              onChange={onChangeQuantity}
            />
          );
        } else {
          return (
            <OutlinedInput
              id="outlined-basic"
              endAdornment={<InputAdornment position="end">ｇ</InputAdornment>}
              size="small"
              value={quantity}
            />
          );
        }
      })()}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <label htmlFor="purchaseDate">
          <div>賞味期限・消費期限</div>
          <DesktopDatePicker
            inputFormat="MM/dd/yyyy"
            value={bestBefore}
            onChange={onChangeBestBefore}
            renderInput={(params) => <TextField {...params} />}
          />
        </label>
      </LocalizationProvider>
      <div>
        <button onClick={onClickClear}>クリア</button>
        <button onClick={onClickRegisterFood}>食材を登録する</button>
      </div>
    </div>
  );
};
