import { useCallback, useState } from "react";
import axios from "axios";
import type { Meal } from "../types/meal";
import type { MealListById } from "../types/mealListById";

export const useFetchMeal = () => {
  const [mealList, setMealList] = useState<MealListById[]>([]);
  const [allMealList, setAllMealList] = useState<Meal[]>([]);

  const getAllMealList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/meal").then((response) => {
      setAllMealList(response.data);
    });
  }, []);

  const getMealList = useCallback((userId: number) => {
    axios
      .post("http://localhost:3001/api/post/mealListById", {
        userId: userId,
      })
      .then((response) => {
        setMealList(response.data);
      });
  }, []);

  return { mealList, getMealList, getAllMealList, allMealList };
};
