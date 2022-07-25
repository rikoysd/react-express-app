import axios from "axios";
import { useCallback, useState } from "react";
import type { Refrigerator } from "../types/refrigerator";

export const useFetchRefrigerator = () => {
  const [foodList, setFoodList] = useState<Refrigerator[]>([]);

  const getFoodList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/foodList").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  return { foodList, getFoodList };
};
