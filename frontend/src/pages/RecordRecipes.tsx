import { ChangeEvent, FC, useState } from "react";
import { Calender } from "../components/Calender";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const RecordRecipes: FC = () => {
  // 日付
  const [date, setDate] = useState<Date | null>(new Date());
  // 食事
  const [meal, setMeal] = useState<string>("朝食");
  // 料理名
  const [name, setName] = useState<string>("");
  // メニューのフラグ
  const [menuFlag, setMenuFlag] = useState<boolean>(false);

  /**
   * 日付を選択.
   * @param newValue
   */
  const onChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  /**
   * 食事のカテゴリを選択.
   * @param e
   */
  const onChangeMeal = (e: SelectChangeEvent) => {
    setMeal(e.target.value);
  };

  /**
   * 料理名の入力.
   * @param e
   */
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  /**
   * メニューの表示・非表示.
   */
  const onClickAddMenu = () => {
    if (menuFlag === false) {
      setMenuFlag(true);
    } else {
      setMenuFlag(false);
    }
  };

  return (
    <SContainer>
      <Calender></Calender>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <label htmlFor="date">
            <div>日付</div>
            <DesktopDatePicker
              inputFormat="yyyy/MM/dd"
              value={date}
              onChange={onChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </label>
        </LocalizationProvider>
        <div>食事</div>
        <FormControl sx={{ width: 200 }}>
          <Select value={meal} onChange={onChangeMeal}>
            <MenuItem value="朝食">朝食</MenuItem>
            <MenuItem value="昼食">昼食</MenuItem>
            <MenuItem value="夕食">夕食</MenuItem>
            <MenuItem value="おやつ">おやつ</MenuItem>
          </Select>
        </FormControl>
        <div>メニュー</div>
        <Button variant="outlined" onClick={onClickAddMenu}>
          追加する
        </Button>
        {menuFlag && (
          <div>
            <div>
              <label htmlFor="name">
                <div>料理名</div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChangeName}
                />
              </label>
            </div>
            <div>食材</div>
            <Button variant="outlined">追加する</Button>
          </div>
        )}
        <div>
          <Button variant="contained">登録する</Button>
        </div>
      </div>
    </SContainer>
  );
};

const SContainer = styled("div")({
  display: "flex",
});
