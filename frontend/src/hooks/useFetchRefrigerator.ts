import axios from "axios";
import { useState } from "react";
import type { Refrigerator } from "../types/refrigerator";
import { addHours } from "date-fns";

export const useFetchRefrigerator = () => {
  const [foodList, setFoodList] = useState<Refrigerator[]>([]);

  const getFoodList = () => {
    axios.get("http://localhost:3001/api/get/foodList").then((response) => {
      setFoodList(response.data);
    });
  };

  return { foodList, getFoodList };
};
