import React, {
  createContext,
  FC,
  ReactNode,
  useState,
} from "react";
import type { User } from "../types/user";

type Props = {
  children: ReactNode;
};

type LoginType = {
  loginUser: User;
  setLoginUser: React.Dispatch<React.SetStateAction<User>>;
};

export const LoginContext = createContext<LoginType | null>(null);

export const LoginProvider: FC<Props> = (props) => {
  const { children } = props;

  // ログインユーザー
  const [loginUser, setLoginUser] = useState<User>({
    userId: 0,
    mailAddress: "",
    password: "",
  });

  return (
    <LoginContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginContext.Provider>
  );
};
