import { useCallback, useState } from "react";
import axios from "axios";
import type { Meal } from "../types/meal";

export const useFetchMeal = () => {
  const [mealList, setMealList] = useState<Meal[]>([]);

  const getMealList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/meal").then((response) => {
      setMealList(response.data);
    });
  }, []);

  return { mealList, getMealList };
};
