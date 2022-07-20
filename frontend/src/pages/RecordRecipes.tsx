import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FoodListModal } from "../components/FoodListModal";
import { FoodContext } from "../provider/FoodProvider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MenuOfDate } from "../components/MenuOfDate";

export const RecordRecipes: FC = () => {
  // 日付
  const [date, setDate] = useState<Date | null>(new Date());
  // 食事
  const [meal, setMeal] = useState<string>("朝食");
  // 料理名
  const [name, setName] = useState<string>("");
  // メニューのフラグ
  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const food = useContext(FoodContext);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {}, [flag]);

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

  /**
   * 食材の削除
   * @param index - インデックス
   */
  const handleDelete = (index: number) => {
    food?.checkedFoodList.splice(index, 1);
    // 食材が削除されたためフラグの値を変更
    setFlag(true);
  };

  return (
    <div>
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
          {/* {menuFlag && ( */}
          <SMenu>
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
            <div>
              <Button onClick={handleOpen}>追加する</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <FoodListModal handleClose={handleClose}></FoodListModal>
                </Box>
              </Modal>
            </div>
            {(() => {
              if (food?.checkedFoodList.length !== 0) {
                return (
                  <Stack direction="row" spacing={1}>
                    {food?.checkedFoodList.map((food, index) => (
                      <div key={index}>
                        <Chip
                          label={food.name}
                          onDelete={() => handleDelete(index)}
                        />
                      </div>
                    ))}
                  </Stack>
                );
              }
            })()}
          </SMenu>
          {/* )} */}
          <div>
            <Button variant="contained">登録する</Button>
          </div>
        </div>
      </SContainer>
      <MenuOfDate></MenuOfDate>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});

const SMenu = styled("div")({
  border: "1px solid",
  padding: "20px 15px",
  margin: "10px",
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
