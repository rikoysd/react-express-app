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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import type { User } from "../types/user";

type Props = {
  bestBefore: Date | null;
  loginUser: User;
};

export const FoodList: FC<Props> = (props) => {
  const { bestBefore, loginUser } = props;
  const { foodList, getFoodList, userFoodList, getUserFoodList } =
    useFetchRefrigerator();
  // 編集ボタンのフラグ
  const [flag, setFlag] = useState<Boolean>(false);
  // チェックボックスのフラグ
  const [checkFlag, setCheckFlag] = useState<Boolean>(false);
  // チェックした食材リスト
  const [checkedFoodList, setCheckedFoodList] = useState<Refrigerator[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getFoodList(props.loginUser.userId);
      await getUserFoodList();
    })();
  }, [bestBefore, checkedFoodList, checkFlag, flag]);

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

      for (let ob of userFoodList) {
        if (ob.foodId === food.foodId) {
          await axios
            .post("http://localhost:3001/api/delete/user_food", {
              id: ob.id,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
    // 配列を空にする
    setCheckedFoodList([]);
    setCheckFlag(false);
    setFlag(false);
  }, [checkedFoodList, userFoodList]);

  return (
    <div>
      <SPosition>
        <div>冷蔵庫一覧</div>
        {(() => {
          if (flag === false) {
            return (
              <Button
                size="small"
                style={{
                  color: "black",
                  backgroundColor: "#FEC062",
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  boxShadow: "none",
                }}
                variant="contained"
                onClick={onClickEdit}
              >
                編集する
              </Button>
            );
          } else {
            return (
              <div>
                {checkFlag && (
                  <Button
                    size="small"
                    style={{
                      color: "black",
                      backgroundColor: "#FF7E35",
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                      boxShadow: "none",
                      marginRight: "10px",
                    }}
                    variant="contained"
                    onClick={onClickDelete}
                  >
                    選択項目を削除
                  </Button>
                )}
                <Button
                  size="small"
                  style={{
                    color: "black",
                    backgroundColor: "#FEC062",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    boxShadow: "none",
                  }}
                  variant="contained"
                  onClick={onClickFinished}
                >
                  編集をやめる
                </Button>
              </div>
            );
          }
        })()}
      </SPosition>
      <TableContainer
        sx={{
          width: "450px",
          height: "500px",
          border: "solid 2px #FEC062",
          padding: "10px",
        }}
      >
        {(() => {
          if (foodList.length !== 0) {
            return (
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
                        scope="row"
                        style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                      >
                        {flag && (
                          <Checkbox
                            style={{ padding: 0, marginRight: "10px" }}
                            size="small"
                            onChange={onChangeCheckBox(index)}
                          ></Checkbox>
                        )}
                        {food.name}
                      </TableCell>
                      {(() => {
                        if (food.qSelect === 1) {
                          return (
                            <TableCell
                              align="right"
                              style={{
                                fontFamily: "'Zen Maru Gothic', sans-serif",
                              }}
                            >
                              {food.quantity}個
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              align="right"
                              style={{
                                fontFamily: "'Zen Maru Gothic', sans-serif",
                              }}
                            >
                              {food.quantity}g
                            </TableCell>
                          );
                        }
                      })()}
                      <TableCell
                        align="right"
                        style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                      >
                        {
                          new Date(food.bestBefore)
                            .toLocaleString()
                            .split(" ")[0]
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            );
          } else {
            return <SMsg>食材が登録されていません</SMsg>;
          }
        })()}
      </TableContainer>
    </div>
  );
};

const SPosition = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "10px",
});

const SMsg = styled("div")({
  margin: "10px 20px",
});
