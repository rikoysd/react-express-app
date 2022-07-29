import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useState,
} from "react";
import type { User } from "../types/user";

type Props = {
  children: ReactNode;
};

export const LoginContext = createContext<User>({
  userId: 0,
  mailAddress: "",
  password: "",
});
export const SetLoginContext = createContext<Dispatch<User>>(
  () => undefined
);

export const LoginProvider: FC<Props> = (props) => {
  const { children } = props;

  // ログインユーザー
  const [loginUser, setLoginUser] = useState<User>({
    userId: 0,
    mailAddress: "",
    password: "",
  });

  return (
    <LoginContext.Provider value={loginUser}>
      <SetLoginContext.Provider value={setLoginUser}>
        {children}
      </SetLoginContext.Provider>
    </LoginContext.Provider>
  );
};
