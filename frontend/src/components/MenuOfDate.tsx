import { FC, useCallback, useEffect, useState } from "react";
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
    flag,
  } = useFetchMealById();
  const [displayCalenderDate, setDisplayCalenderDate] = useState<string>("");

  useEffect(() => {
    const nowDate = new Date();
    const nowDateStr = format(nowDate, "yyyy/MM/dd");
    setDate(nowDateStr);
    (async () => {
      await getMealById(nowDateStr);
    })();

    if (props.calenderDate) {
      changeDate(props.calenderDate);
    }
  }, [props.calenderDate, calenderFlag]);

  const changeDate = useCallback(
    (date: string) => {
      const newDate = date.split("-").join("/");
      setDisplayCalenderDate(newDate);
      (async () => {
        await getMealById(newDate);
      })();
    },
    [morningMenuList]
  );

  useEffect(() => {
    console.log(morningMenuList);
  }, [morningMenuList, flag]);

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
          <ul>
            {morningMenuList.map((menu, index) => (
              <li key={index}>{menu.name}</li>
            ))}
          </ul>
        </div>
        {/* <div>
          <h4>昼食</h4>
          {lunchMenuList.map((menu, index) => (
            <ul key={index}>
              <li>{menu.name}</li>
            </ul>
          ))}
        </div> */}
        {/* {(() => {
            if (dinnerMenuList.length !== 0) {
              <div>
                <h4>夕食</h4>
                {dinnerMenuList.map((menu, index) => (
                  <ul key={index}>
                    <li>{menu.name}</li>
                  </ul>
                ))}
              </div>;
            }
          })()}
          {(() => {
            if (snackMenuList.length !== 0) {
              <div>
                <h4>おやつ</h4>
                {snackMenuList.map((menu, index) => (
                  <ul key={index}>
                    <li>{menu.name}</li>
                  </ul>
                ))}
              </div>;
            }
          })()} */}
      </SContainer>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});
