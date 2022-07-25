import { useCallback, useState } from "react";
import axios from "axios";
import { Menu } from "../types/menu";

export const useFetchMenu = () => {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  const getMenuList = useCallback(() => {
    axios.get("http://localhost:3001/api/get/menuList").then((response) => {
      console.log(response);
      setMenuList(response.data);
    });
  }, []);
  return { getMenuList, menuList };
};
