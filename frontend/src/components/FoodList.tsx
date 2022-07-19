import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFetchRefrigerator } from "../hooks/useFetchRefrigerator";
import Checkbox from "@mui/material/Checkbox";
import type { Refrigerator } from "../types/refrigerator";
import axios from "axios";
import { addHours } from "date-fns";

type Props = {
  bestBefore: Date | null;
};

export const FoodList: FC<Props> = (props) => {
  const { bestBefore } = props;
  const { foodList, getFoodList } = useFetchRefrigerator();
  // 編集ボタンのフラグ
  const [flag, setFlag] = useState<Boolean>(false);
  // チェックボックスのフラグ
  const [checkFlag, setCheckFlag] = useState<Boolean>(false);
  // チェックした食材リスト
  const [checkedFoodList, setCheckedFoodList] = useState<Refrigerator[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getFoodList();
    })();
    if (foodList.length === 0) {
      setMessage("食材が登録されていません");
    } else {
      setMessage("");
    }
  }, [bestBefore, checkedFoodList, checkFlag, flag, foodList]);

  /**
   * 編集する.
   */
  const onClickEdit = useCallback(() => {
    setFlag(true);
  }, []);

  /**
   * 編集をやめる.
   */
  const onClickFinished = useCallback(() => {
    setFlag(false);
    setCheckFlag(false);
  }, []);

  /**
   * チェックボックスを選択.
   * @param index - インデックス
   */
  const onChangeCheckBox = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const food = foodList[index];
      const newArray = [...checkedFoodList];
      if (e.target.checked === true) {
        setCheckFlag(true);
        newArray.push(food);
        setCheckedFoodList(newArray);
      } else {
        for (let i = 0; i < newArray.length; i++) {
          if (food.foodId === newArray[i].foodId) {
            newArray.splice(i, 1);
            setCheckedFoodList(newArray);
          }
          if (newArray.length === 0) {
            setCheckFlag(false);
          }
        }
      }
    },
    [foodList, checkedFoodList]
  );

  /**
   * 選択項目を削除.
   */
  const onClickDelete = useCallback(async () => {
    alert("選択した項目を全て削除しますか？");
    for (let food of checkedFoodList) {
      await axios
        .post("http://localhost:3001/api/delete/foodList", {
          id: food.foodId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 配列を空にする
    setCheckedFoodList([]);
    setCheckFlag(false);
    setFlag(false);
  }, [checkedFoodList]);

  return (
    <div>
      <div>冷蔵庫一覧</div>
      {(() => {
        if (flag === false) {
          return <button onClick={onClickEdit}>編集する</button>;
        } else {
          return <button onClick={onClickFinished}>編集をやめる</button>;
        }
      })()}
      {checkFlag && flag && (
        <button onClick={onClickDelete}>選択項目を削除</button>
      )}
      <TableContainer sx={{ width: 560 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>食材名</TableCell>
              <TableCell align="right">数量</TableCell>
              <TableCell align="right">期限</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodList.map((food, index) => (
              <TableRow key={index}>
                <TableCell scope="row">
                  {flag && (
                    <Checkbox
                      size="small"
                      onChange={onChangeCheckBox(index)}
                    ></Checkbox>
                  )}
                  {food.name}
                </TableCell>
                {(() => {
                  if (food.qSelect === 1) {
                    return (
                      <TableCell align="right">{food.quantity}個</TableCell>
                    );
                  } else {
                    return (
                      <TableCell align="right">{food.quantity}g</TableCell>
                    );
                  }
                })()}
                <TableCell align="right">
                  {new Date(food.bestBefore).toLocaleString().split(" ")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>{message}</div>
    </div>
  );
};
