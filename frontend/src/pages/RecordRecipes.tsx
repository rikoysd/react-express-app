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
import { format } from "date-fns/esm";
import { useFetchMeal } from "../hooks/useFetchMeal";
import axios from "axios";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

type Props = {
  loginUser: User;
};

export const RecordRecipes: FC<Props> = (props) => {
  // 日付
  const [date, setDate] = useState<Date | null>(new Date());
  // 食事
  const [meal, setMeal] = useState<string>("朝食");
  // 料理名
  const [name, setName] = useState<string>("");
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
  // 名前のエラー
  const [nameError, setNameError] = useState<string>("");
  // メニューリスト
  const [postMenuList, setPostMenuList] = useState<Menu[]>([]);
  // メニューリスト（表示用）
  const [displayMenuList, setDisplayMenuList] = useState<Menu[]>([]);
  // メニューのエラー
  const [menuError, setMenuError] = useState<string>("");
  const { menuList, getMenuList } = useFetchMenu();
  const { mealList, getMealList } = useFetchMeal();
  // 送信エラー
  const [submitError, setSubmitError] = useState<string>("");
  // エラーリスト
  const [errorList, setErrorList] = useState<boolean[]>([]);
  const { loginUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginUser) {
      getMenuList();
      getMealList();
    } else {
      navigate("/login");
    }
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
    let newPostMenuList = [...postMenuList];
    const newErrorList = [...errorList];
    if (name === "") {
      setNameError("食材名を入力してください");
      newErrorList.push(true);
    } else {
      setNameError("");
      const menu: Menu = {
        menuId: -1,
        name: name,
        foodList: food,
      };
      newPostMenuList.push(menu);
      setPostMenuList(newPostMenuList);
      setDisplayMenuList(newPostMenuList);

      // 入力値をクリアにする
      setName("");
      setFood([]);
    }
  }, [name, food]);

  /**
   * 献立を登録する.
   */
  const onClickRegisterRecipe = useCallback(async () => {
    // エラー処理
    let newErrorList = [...errorList];
    newErrorList = [];

    if (date?.toString() === "Invalid Date") {
      setDateError("不正な日付です");
      newErrorList.push(true);
    } else {
      setDateError("");
    }

    if (postMenuList.length === 0) {
      setMenuError("メニューを一つ以上登録してください");
      newErrorList.push(true);
    }

    if (newErrorList.length !== 0) {
      setSubmitError("正しく入力されていない箇所があります");
      return;
    }

    let dateFormat = format(Number(date), "yyyy/MM/dd");

    // id採番
    let mealId = 0;
    let idList = [];
    if (mealList.length === 0) {
      mealId = 1;
    } else {
      for (let menu of mealList) {
        idList.push(menu.mealId);
      }
      mealId = Math.max(...idList) + 1;
    }

    // 献立の登録
    await axios
      .post("http://localhost:3001/api/post/mealList", {
        mealId: mealId,
        date: dateFormat,
        meal: meal,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setSubmitError("登録できませんでした");
      });

    // メニューの登録
    const newMenuList = [...menuList];
    for (let i = 0; i < postMenuList.length; i++) {
      // id採番
      let id = 0;
      let idList = [];
      if (newMenuList.length === 0) {
        id = 1;
      } else {
        for (let menu of newMenuList) {
          idList.push(menu.menuId);
        }
        id = Math.max(...idList) + (i + 1);
      }

      await axios
        .post("http://localhost:3001/api/post/menuList", {
          menuId: id,
          name: postMenuList[i].name,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setSubmitError("登録できませんでした");
        });

      const newMenu: Menu = {
        menuId: id,
        name: postMenuList[i].name,
        foodList: postMenuList[i].foodList,
      };
      newMenuList.push(newMenu);
      setPostMenuList(newMenuList);

      // 献立とメニューidの登録
      await axios
        .post("http://localhost:3001/api/post/meal_menu", {
          mealId: mealId,
          menuId: id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setSubmitError("登録できませんでした");
        });

      // メニューと食材idの登録
      for (let food of postMenuList[i].foodList) {
        await axios
          .post("http://localhost:3001/api/post/menu_food", {
            menuId: id,
            foodId: food.foodId,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            setSubmitError("登録できませんでした");
          });
      }
    }
    // 表示用のメニューリストを空に
    setDisplayMenuList([]);
  }, [date, meal, mealList]);

  /**
   * フォームリセット.
   */
  const onClickClear = () => {
    setDate(new Date());
    setMeal("朝食");
    setName("");
    setPostMenuList([]);
    setDisplayMenuList([]);
    setFood([]);
  };

  return (
    <div>
      <SContainer>
        <SCalender>
          <Calender
            calenderFlag={calenderFlag}
            setCalenderFlag={setCalenderFlag}
            setCalenderDate={setCalenderDate}
          ></Calender>
        </SCalender>
        <div>
          <h2>献立記録</h2>
          <SFormPosition>
            <SItemBlock style={{ marginRight: "15px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <label htmlFor="date">
                  <SItem>日付</SItem>
                  <div>{dateError}</div>
                  <DesktopDatePicker
                    inputFormat="yyyy/MM/dd"
                    value={date}
                    onChange={onChangeDate}
                    renderInput={(params) => (
                      <TextField {...params} style={{ width: "250px" }} />
                    )}
                  />
                </label>
              </LocalizationProvider>
            </SItemBlock>
            <SItemBlock>
              <SItem>食事</SItem>
              <FormControl sx={{ width: "250px" }}>
                <Select value={meal} onChange={onChangeMeal}>
                  <MenuItem value="朝食">朝食</MenuItem>
                  <MenuItem value="昼食">昼食</MenuItem>
                  <MenuItem value="夕食">夕食</MenuItem>
                  <MenuItem value="おやつ">おやつ</MenuItem>
                </Select>
              </FormControl>
            </SItemBlock>
          </SFormPosition>
          <SItemBlock>
            <div>メニュー</div>
            <div>{menuError}</div>
            <SMenu>
              <SItemBlock2>
                <label htmlFor="name">
                  <SItem>料理名</SItem>
                  <div>{nameError}</div>
                  <TextField
                    id="name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
                    size="small"
                    style={{ width: "300px" }}
                  />
                </label>
              </SItemBlock2>
              <SItemBlock2
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <div>
                  <SItem>食材</SItem>
                  <div>
                    <Button
                      style={{
                        fontFamily: "'Zen Maru Gothic', sans-serif",
                        color: "#FFAA2C",
                      }}
                      onClick={handleOpen}
                    >
                      追加する
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <FoodListModal
                          handleClose={handleClose}
                          loginUser={props.loginUser}
                        ></FoodListModal>
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
                </div>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#FEC062",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    boxShadow: "none",
                  }}
                  variant="contained"
                  onClick={onClickRegisterMenu}
                >
                  メニューを登録する
                </Button>
              </SItemBlock2>
            </SMenu>
          </SItemBlock>
          {(() => {
            if (displayMenuList.length !== 0) {
              return (
                <SMenu2>
                  {displayMenuList.map((menu, index) => (
                    <div key={index}>
                      <div>{menu.name}</div>
                    </div>
                  ))}
                </SMenu2>
              );
            }
          })()}
          <div>{submitError}</div>
          <SButtonPosition>
            <div>
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
            </div>
            <div>
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
                onClick={onClickRegisterRecipe}
              >
                登録する
              </Button>
            </div>
          </SButtonPosition>
        </div>
      </SContainer>
      <MenuOfDate
        calenderFlag={calenderFlag}
        calenderDate={calenderDate}
        displayMenuList={displayMenuList}
      ></MenuOfDate>
    </div>
  );
};

const SButtonPosition = styled("div")({
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
});

const SCalender = styled("div")({
  marginRight: "40px",
});

const SContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "60px 0",
});

const SFormPosition = styled("div")({
  display: "flex",
});

const SItem = styled("div")({
  marginBottom: "8px",
});

const SItemBlock = styled("div")({
  margin: "20px 0",
});

const SItemBlock2 = styled("div")({
  margin: "10px 0",
});

const SMenu = styled("div")({
  border: "1px solid #FFAA2C",
  padding: "20px 15px",
  margin: "10px",
  width: "500px",
});

const SMenu2 = styled("div")({
  backgroundColor: "#FFF5DD",
  padding: "20px 50px",
  margin: "10px",
  maxWidth: "500px",
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
