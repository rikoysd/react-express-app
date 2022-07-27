import { useCallback, useContext, useState } from "react";
import axios from "axios";
import type { Meal } from "../types/meal";
import type { Menu } from "../types/menu";

export const useFetchMealById = () => {
  // 該当日の献立リスト
  const [mealListById, setMealListById] = useState<Meal[]>([]);
  // 朝食リスト
  const [morningList, setMorningList] = useState<Meal[]>([]);
  // 昼食リスト
  const [lunchList, setLunchList] = useState<Meal[]>([]);
  // 夕食リスト
  const [dinnerList, setDinnerList] = useState<Meal[]>([]);
  // 間食リスト
  const [snackList, setSnackList] = useState<Meal[]>([]);
  // 朝食メニュー
  const [morningMenuList, setMorningMenuList] = useState<Menu[]>([]);
  const [lunchMenuList, setLunchMenuList] = useState<Menu[]>([]);
  const [dinnerMenuList, setDinnerMenuList] = useState<Menu[]>([]);
  const [snackMenuList, setSnackMenuList] = useState<Menu[]>([]);

  const getMealById = useCallback(async (date: string) => {
    const newMorningList = [...morningList];
    const newLunchList = [...lunchList];
    const newDinnerList = [...dinnerList];
    const newSnackList = [...snackList];
    await axios
      .post("http://localhost:3001/api/post/targetMeal", {
        date: date,
      })
      .then((response) => {
        setMealListById(response.data);

        for (let meal of response.data) {
          if (meal.meal === "朝食") {
            newMorningList.push(meal);
          } else if (meal.meal === "昼食") {
            newLunchList.push(meal);
          } else if (meal.meal === "夕食") {
            newDinnerList.push(meal);
          } else {
            newSnackList.push(meal);
          }
        }
        setMorningList(newMorningList);
        setLunchList(newLunchList);
        setDinnerList(newDinnerList);
        setSnackList(newSnackList);
      });
    for (let meal of newMorningList) {
      await getMenuById(meal.mealId, "朝食");
    }

    for (let meal of newLunchList) {
      await getMenuById(meal.mealId, "昼食");
    }

    for (let meal of newDinnerList) {
      await getMenuById(meal.mealId, "夕食");
    }

    for (let meal of newSnackList) {
      await getMenuById(meal.mealId, "おやつ");
    }
  }, []);

  const getMenuById = useCallback(async (mealId: number, category: string) => {
    let menuIdList: Array<number> = [];
    await axios
      .post("http://localhost:3001/api/post/targetMenu", {
        mealId: mealId,
      })
      .then((response) => {
        for (let menu of response.data) {
          menuIdList.push(menu.menuId);
        }
      });
    for (let id of menuIdList) {
      getMenuList(id, category);
    }
  }, []);

  const getMenuList = useCallback(async (menuId: number, category: string) => {
    await axios
      .post("http://localhost:3001/api/post/targetMenuDetail", {
        menuId: menuId,
      })
      .then((response) => {
        if (category === "朝食") {
          setMorningMenuList(response.data);
        } else if (category === "昼食") {
          setLunchMenuList(response.data);
        } else if (category === "夕食") {
          setDinnerMenuList(response.data);
        } else {
          setSnackMenuList(response.data);
        }
      });
  }, []);

  return {
    mealListById,
    morningList,
    lunchList,
    dinnerList,
    snackList,
    getMealById,
    morningMenuList,
    lunchMenuList,
    dinnerMenuList,
    snackMenuList,
  };
};
