import axios from "axios";
import { useCallback, useState } from "react";
import type { Refrigerator } from "../types/refrigerator";
import type { RefrigeratorById } from "../types/refrigeratorById";
import type { UserFood } from "../types/userFood";

export const useFetchRefrigerator = () => {
  const [foodList, setFoodList] = useState<RefrigeratorById[]>([]);
  const [allFoodList, setAllFoodList] = useState<Refrigerator[]>([]);
  const [userFoodList, setUserFoodList] = useState<UserFood[]>([]);

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

  const getUserFoodList = useCallback(async () => {
    axios.get("http://localhost:3001/api/get/user_food").then((response) => {
      setUserFoodList(response.data);
    });
  }, []);

  return {
    foodList,
    getFoodList,
    getAllFoodList,
    allFoodList,
    getUserFoodList,
    userFoodList,
  };
};
