import { useCallback, useState } from "react";
import axios from "axios";

export const useFetchMeal = () => {
  const [mealList, setMealList] = useState();

  const getMealList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/mealList").then((response) => {
      console.log(response);
      setMealList(response.data);
    });
  }, []);

  return { mealList, getMealList };
};
