import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { useFetchMealById } from "../hooks/useFetchMealById";

type Props = {
  calenderFlag: boolean;
  calenderDate: string;
};

export const MenuOfDate: FC<Props> = (props) => {
  const { calenderFlag, calenderDate } = props;
  const [date, setDate] = useState<string>("");
  const {
    getMealById,
    morningMenuList,
    lunchMenuList,
    dinnerMenuList,
    snackMenuList,
  } = useFetchMealById();
  const [displayCalenderDate, setDisplayCalenderDate] = useState<string>("");

  useEffect(() => {
    const nowDate = new Date();
    const nowDateStr = format(nowDate, "yyyy/MM/dd");
    setDate(nowDateStr);
    (async () => {
      await getMealById(nowDateStr);
    })();

    // const newDate = props.calenderDate.split("-").join("/");
    // setDisplayCalenderDate(newDate);
    // console.log(newDate);
    // getMealById(newDate);
  }, [props.calenderDate, calenderFlag]);

  useEffect(() => {}, [morningMenuList]);

  return (
    <div>
      {(() => {
        if (props.calenderFlag === true) {
          return <h4>{displayCalenderDate}</h4>;
        } else {
          return <h4>{date}</h4>;
        }
      })()}
      <SContainer>
        <div>
          <h4>朝食</h4>
          {morningMenuList.map((menu, index) => (
            <ul key={index}>
              <li>{menu.name}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>昼食</h4>
          {lunchMenuList.map((menu, index) => (
            <ul key={index}>
              <li>{menu.name}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>夕食</h4>
          {dinnerMenuList.map((menu, index) => (
            <ul key={index}>
              <li>{menu.name}</li>
            </ul>
          ))}
        </div>
        <div>
          <h4>おやつ</h4>
          {snackMenuList.map((menu, index) => (
            <ul key={index}>
              <li>{menu.name}</li>
            </ul>
          ))}
        </div>
      </SContainer>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});
