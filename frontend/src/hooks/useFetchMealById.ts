import { useCallback, useState } from "react";
import axios from "axios";
import type { MealList } from "../types/mealList";

export const useFetchMealById = () => {
  // 該当日の献立リスト
  const [mealListById, setMealListById] = useState<MealList[]>([]);
  // 朝食メニュー
  const [morningMenuList, setMorningMenuList] = useState<MealList[]>([]);
  // 昼食メニュー
  const [lunchMenuList, setLunchMenuList] = useState<MealList[]>([]);
  // 夕食メニュー
  const [dinnerMenuList, setDinnerMenuList] = useState<MealList[]>([]);
  // おやつメニュー
  const [snackMenuList, setSnackMenuList] = useState<MealList[]>([]);
  const [flag, setFlag] = useState<boolean>(false);

  const getMealById = useCallback(async (userId: number, date: string) => {
    let newMorningMenuList = [...morningMenuList];
    let newLunchMenuList = [...lunchMenuList];
    let newDinnerMenuList = [...dinnerMenuList];
    let newSnackMenuList = [...snackMenuList];
    await axios
      .post("http://localhost:3001/api/post/mealListByDate", {
        userId: userId,
        date: date,
      })
      .then((response) => {
        console.log(response.data);
        setMealListById(response.data);

        if (response.data.length === 0) {
          setFlag(true);
          // 各カテゴリのメニューリストを空にする
          newMorningMenuList = [];
          newLunchMenuList = [];
          newDinnerMenuList = [];
          newSnackMenuList = [];
          setMorningMenuList(newMorningMenuList);
          setLunchMenuList(newLunchMenuList);
          setDinnerMenuList(newDinnerMenuList);
          setSnackMenuList(newSnackMenuList);
          setMealListById([]);
          return;
        }

        // 各カテゴリのメニューリストを空にする
        newMorningMenuList = [];
        newLunchMenuList = [];
        newDinnerMenuList = [];
        newSnackMenuList = [];

        for (let meal of response.data) {
          if (meal.meal === "朝食") {
            newMorningMenuList.push(meal);
          } else if (meal.meal === "昼食") {
            newLunchMenuList.push(meal);
          } else if (meal.meal === "夕食") {
            newDinnerMenuList.push(meal);
          } else {
            newSnackMenuList.push(meal);
          }
        }
        setMorningMenuList(newMorningMenuList);
        setLunchMenuList(newLunchMenuList);
        setDinnerMenuList(newDinnerMenuList);
        setSnackMenuList(newSnackMenuList);
      });
  }, []);

  return {
    mealListById,
    getMealById,
    morningMenuList,
    lunchMenuList,
    dinnerMenuList,
    snackMenuList,
    flag,
  };
};
