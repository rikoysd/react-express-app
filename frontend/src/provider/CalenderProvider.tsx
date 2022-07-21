import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

export const CalenderContext = createContext<string>("");
export const SetCalenderContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => undefined);

export const CalenderProvider: FC<Props> = (props) => {
  const { children } = props;

  const [clickedDate, setClickedDate] = useState<string>("");

  return (
    <CalenderContext.Provider value={clickedDate}>
      <SetCalenderContext.Provider value={setClickedDate}>
        {children}
      </SetCalenderContext.Provider>
    </CalenderContext.Provider>
  );
};
