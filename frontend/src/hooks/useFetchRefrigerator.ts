import axios from "axios";
import { useCallback, useState } from "react";
import type { Refrigerator } from "../types/refrigerator";
import type { RefrigeratorById } from "../types/refrigeratorById";

export const useFetchRefrigerator = () => {
  const [foodList, setFoodList] = useState<RefrigeratorById[]>([]);
  const [allFoodList, setAllFoodList] = useState<Refrigerator[]>([]);

  const getFoodList = useCallback((userId: number) => {
    axios
      .post("http://localhost:3001/api/post/foodListById", { userId: userId })
      .then((response) => {
        setFoodList(response.data);
      });
  }, []);

  const getAllFoodList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/foodList").then((response) => {
      setAllFoodList(response.data);
    });
  }, []);

  return { foodList, getFoodList, getAllFoodList, allFoodList };
};
