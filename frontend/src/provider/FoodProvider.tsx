import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import type { Refrigerator } from "../types/refrigerator";

type Props = {
  children: ReactNode;
};

// 値と値を変更する関数のContextを分ける
export const FoodContext = createContext<Refrigerator[]>([]);
export const SetFoodContext = createContext<
  Dispatch<SetStateAction<Refrigerator[]>>
>(() => undefined);

export const FoodProvider: FC<Props> = (props) => {
  const { children } = props;

  // チェックされた食材
  const [checkedFoodList, setCheckedFoodList] = useState<Refrigerator[]>([]);

  return (
    // state用のプロバイダー
    <FoodContext.Provider value={checkedFoodList}>
      {/* set関数用のプロバイダー */}
      <SetFoodContext.Provider value={setCheckedFoodList}>
        {children}
      </SetFoodContext.Provider>
    </FoodContext.Provider>
  );
};
