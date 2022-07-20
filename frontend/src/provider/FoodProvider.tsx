import React, { createContext, FC, ReactNode, useState } from "react";
import type { Refrigerator } from "../types/refrigerator";

type Props = {
  children: ReactNode;
};

type FoodType = {
  checkedFoodList: Array<Refrigerator>;
  setCheckedFoodList: React.Dispatch<React.SetStateAction<Refrigerator[]>>;
};

export const FoodContext = createContext<FoodType | null>(null);

export const FoodProvider: FC<Props> = (props) => {
  const { children } = props;

  // チェックされた食材
  const [checkedFoodList, setCheckedFoodList] = useState<Refrigerator[]>([]);

  return (
    <FoodContext.Provider value={{ checkedFoodList, setCheckedFoodList }}>
      {children}
    </FoodContext.Provider>
  );
};
