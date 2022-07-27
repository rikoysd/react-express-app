import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFetchRefrigerator } from "../hooks/useFetchRefrigerator";
import Checkbox from "@mui/material/Checkbox";
import type { Refrigerator } from "../types/refrigerator";
import Button from "@mui/material/Button";
import { SetFoodContext } from "../provider/FoodProvider";

type Props = {
  handleClose: () => void;
};

export const FoodListModal: FC<Props> = (props) => {
  const { foodList, getFoodList } = useFetchRefrigerator();
  // チェックした食材リスト
  const [checkedFoodList, setCheckedFoodList] = useState<Refrigerator[]>([]);
  // メッセージ
  const [message, setMessage] = useState<string>("");
  // フラグ
  const [flag, setFlag] = useState<boolean>(false);
  // 食材のグローバル管理（set関数）
  const setFood = useContext(SetFoodContext);
  const { handleClose } = props;

  useEffect(() => {
    (async () => {
      await getFoodList();
    })();
    if (foodList.length === 0) {
      setMessage("食材が登録されていません");
    } else {
      setMessage("");
    }
  }, [checkedFoodList]);

  /**
   * チェックボックスを選択.
   * @param index - インデックス
   */
  const onChangeCheckBox = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const food = foodList[index];
      const newArray = [...checkedFoodList];
      if (e.target.checked === true) {
        newArray.push(food);
        setFlag(true);
        setCheckedFoodList(newArray);
      } else {
        for (let i = 0; i < newArray.length; i++) {
          if (food.foodId === newArray[i].foodId) {
            newArray.splice(i, 1);
            setCheckedFoodList(newArray);
          }
          if (newArray.length === 0) {
            setFlag(false);
          }
        }
      }
    },
    [foodList, checkedFoodList]
  );

  /**
   * 選択した食材を登録する.
   */
  const onClickRegister = useCallback(() => {
    setFood(checkedFoodList);
    props.handleClose();
  }, [checkedFoodList]);

  return (
    <div>
      <div>冷蔵庫一覧</div>
      <TableContainer sx={{ width: 560 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
              >
                食材名
              </TableCell>
              <TableCell
                style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                align="right"
              >
                数量
              </TableCell>
              <TableCell
                style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                align="right"
              >
                期限
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodList.map((food, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  scope="row"
                >
                  <Checkbox
                    size="small"
                    onChange={onChangeCheckBox(index)}
                  ></Checkbox>
                  {food.name}
                </TableCell>
                {(() => {
                  if (food.qSelect === 1) {
                    return (
                      <TableCell
                        style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                        align="right"
                      >
                        {food.quantity}個
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                        align="right"
                      >
                        {food.quantity}g
                      </TableCell>
                    );
                  }
                })()}
                <TableCell
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  align="right"
                >
                  {new Date(food.bestBefore).toLocaleString().split(" ")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {flag && (
        <div>
          <Button
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              marginTop: "20px",
              backgroundColor: "#FFAA2C",
              color: "black",
              boxShadow: "none",
              height: "45px",
            }}
            variant="contained"
            onClick={onClickRegister}
          >
            選択した食材を登録する
          </Button>
        </div>
      )}
      <div>{message}</div>
    </div>
  );
};
