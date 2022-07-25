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
import { FoodContext, SetFoodContext } from "../provider/FoodProvider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MenuOfDate } from "../components/MenuOfDate";
import type { Menu } from "../types/menu";
import { useFetchMenu } from "../hooks/useFetchMenu";

export const RecordRecipes: FC = () => {
  // 日付
  const [date, setDate] = useState<Date | null>(new Date());
  // 食事
  const [meal, setMeal] = useState<string>("朝食");
  // 料理名
  const [name, setName] = useState<string>("");
  // メニューのフラグ
  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  // モーダルの表示・非表示
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const food = useContext(FoodContext);
  const setFood = useContext(SetFoodContext);
  const [flag, setFlag] = useState<boolean>(false);
  // カレンダーのフラグ
  const [calenderFlag, setCalenderFlag] = useState<boolean>(false);
  // カレンダーの日付
  const [calenderDate, setCalenderDate] = useState<string>("");
  // 日付エラー
  const [dateError, setDateError] = useState<string>("");
  // メニューリスト
  const [postMenuList, setPostMenuList] = useState<Menu[]>([]);
  const { menuList, getMenuList } = useFetchMenu();

  useEffect(() => {
    getMenuList();
  }, [flag, calenderDate, food]);

  /**
   * 日付を選択.
   * @param newValue
   */
  const onChangeDate = (newValue: Date | null) => {
    if (newValue?.toString() === "Invalid Date") {
      setDateError("不正な日付です");
    } else {
      setDate(newValue);
      setDateError("");
    }
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
    food.splice(index, 1);
    // 食材が削除されたためフラグの値を変更
    setFlag(true);
  };

  /**
   * メニューを追加する.
   */
  const onClickRegisterMenu = useCallback(() => {
    // id採番
    let id = 0;
    if (menuList.length === 0) {
      id = 1;
    } else {
      id = menuList.length + 1;
    }

    const menu: Menu = {
      menuId: id,
      name: name,
      foodList: food,
    };
    let newPostMenuList = [...postMenuList];
    newPostMenuList.push(menu);
    setPostMenuList(newPostMenuList);

    // 入力値をクリアにする
    setName("");
    setFood([]);
  }, [name, food]);

  /**
   * 献立を登録する.
   */
  const onClickRegisterRecipe = () => {
    // if(date===Invalid Date){}
  };

  return (
    <div>
      <SContainer>
        <Calender
          calenderFlag={calenderFlag}
          setCalenderFlag={setCalenderFlag}
          setCalenderDate={setCalenderDate}
        ></Calender>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <label htmlFor="date">
              <div>日付</div>
              <div>{dateError}</div>
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
              if (food.length !== 0) {
                return (
                  <Stack direction="row" spacing={1}>
                    {food.map((food, index) => (
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
            <Button variant="contained" onClick={onClickRegisterMenu}>
              追加する
            </Button>
          </SMenu>
          {/* )} */}
          <div>
            {postMenuList.map((menu, index) => (
              <div key={index}>
                <div>{menu.name}</div>
              </div>
            ))}
          </div>
          <div>
            <Button variant="contained" onClick={onClickRegisterRecipe}>
              登録する
            </Button>
          </div>
        </div>
      </SContainer>
      <MenuOfDate
        calenderFlag={calenderFlag}
        calenderDate={calenderDate}
      ></MenuOfDate>
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
