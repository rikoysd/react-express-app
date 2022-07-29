import { useCallback, useState } from "react";
import type { User } from "../types/user";
import axios from "axios";

export const useFetchUser = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const getUserList = useCallback(async () => {
    await axios.get("http://localhost:3001/api/get/user").then((response) => {
      setUserList(response.data);
    });
  }, []);
  return { userList, getUserList };
};
