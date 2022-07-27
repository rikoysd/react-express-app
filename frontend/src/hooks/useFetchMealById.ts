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
  // 昼食メニュー
  const [lunchMenuList, setLunchMenuList] = useState<Menu[]>([]);
  // 夕食メニュー
  const [dinnerMenuList, setDinnerMenuList] = useState<Menu[]>([]);
  // おやつメニュー
  const [snackMenuList, setSnackMenuList] = useState<Menu[]>([]);
  const [flag, setFlag] = useState<boolean>(false);

  // const clearArray = useCallback(() => {
  //   // console.log("call");
  //   setMorningList([]);
  //   setLunchList([]);
  //   setDinnerList([]);
  //   setSnackList([]);
  //   setMorningMenuList([]);
  //   setLunchMenuList([]);
  //   setDinnerMenuList([]);
  //   setSnackMenuList([]);
  //   getMealById("2022/07/27");
  // }, []);

  const getMealById = useCallback(
    async (date: string) => {
      let newMorningList = [...morningList];
      let newLunchList = [...lunchList];
      let newDinnerList = [...dinnerList];
      let newSnackList = [...snackList];
      let newMorningMenuList = [...morningMenuList];
      let newLunchMenuList = [...lunchMenuList];
      let newDinnerMenuList = [...dinnerMenuList];
      let newSnackMenuList = [...snackMenuList];
      await axios
        .post("http://localhost:3001/api/post/targetMeal", {
          date: date,
        })
        .then((response) => {
          console.log(response);
          setMealListById(response.data);

          if (response.data.length === 0) {
            console.log("call");
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
            return;
          }

          for (let meal of response.data) {
            if (meal.meal === "朝食") {
              newMorningList = [];
              newMorningList.push(meal);
            } else if (meal.meal === "昼食") {
              newLunchList = [];
              newLunchList.push(meal);
            } else if (meal.meal === "夕食") {
              newDinnerList = [];
              newDinnerList.push(meal);
            } else {
              newSnackList = [];
              newSnackList.push(meal);
            }
          }
          setMorningList(newMorningList);
          setLunchList(newLunchList);
          setDinnerList(newDinnerList);
          setSnackList(newSnackList);
        });
      if (newMorningList.length !== 0) {
        for (let meal of newMorningList) {
          await getMenuById(meal.mealId, "朝食");
        }
      }

      if (newLunchList.length !== 0) {
        for (let meal of newLunchList) {
          await getMenuById(meal.mealId, "昼食");
        }
      }

      if (newDinnerList.length !== 0) {
        for (let meal of newDinnerList) {
          await getMenuById(meal.mealId, "夕食");
        }
      }

      if (newSnackList.length !== 0) {
        for (let meal of newSnackList) {
          await getMenuById(meal.mealId, "おやつ");
        }
      }
    },
    [morningMenuList]
  );

  const getMenuById = useCallback(async (mealId: number, category: string) => {
    console.log("call");
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
    let newMorningMenuList = [...morningMenuList];
    let newLunchMenuList = [...lunchMenuList];
    let newDinnerMenuList = [...dinnerMenuList];
    let newSnackMenuList = [...snackMenuList];
    await axios
      .post("http://localhost:3001/api/post/targetMenuDetail", {
        menuId: menuId,
      })
      .then((response) => {
        if (category === "朝食") {
          newMorningMenuList = [];
          newMorningMenuList.push(response.data);
          console.log(newMorningMenuList);
          setMorningMenuList(newMorningMenuList);
        } else if (category === "昼食") {
          newLunchMenuList = [];
          newLunchMenuList.push(response.data);
          setLunchMenuList(newLunchMenuList);
        } else if (category === "夕食") {
          newDinnerMenuList = [];
          newDinnerMenuList.push(response.data);
          setDinnerMenuList(newDinnerMenuList);
        } else {
          newSnackMenuList = [];
          newSnackMenuList.push(response.data);
          setSnackMenuList(newSnackMenuList);
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
    flag,
  };
};
