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
    mealListById,
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

  useEffect(() => {}, [morningMenuList, flag]);

  return (
    <div>
      <SPosition>
        <SBlock2>
          {(() => {
            if (props.calenderFlag === true) {
              return <h3>{displayCalenderDate}</h3>;
            } else {
              return <h3>{date}</h3>;
            }
          })()}
        </SBlock2>
      </SPosition>
      <SPosition>
        <SBlock>
          <SContainer>
            {(() => {
              if (mealListById.length === 0) {
                return <div>メニューが登録されていません</div>;
              } else {
                return (
                  <div>
                    {(() => {
                      if (morningMenuList.length !== 0) {
                        return (
                          <div>
                            <h4>朝食</h4>
                            <ul>
                              {morningMenuList.map((menu, index) => (
                                <li key={index}>{menu.name}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (lunchMenuList.length !== 0) {
                        return (
                          <div>
                            <h4>昼食</h4>
                            {lunchMenuList.map((menu, index) => (
                              <ul key={index}>
                                <li>{menu.name}</li>
                              </ul>
                            ))}
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (dinnerMenuList.length !== 0) {
                        return (
                          <div>
                            <h4>夕食</h4>
                            {dinnerMenuList.map((menu, index) => (
                              <ul key={index}>
                                <li>{menu.name}</li>
                              </ul>
                            ))}
                          </div>
                        );
                      }
                    })()}
                    {(() => {
                      if (snackMenuList.length !== 0) {
                        return (
                          <div>
                            <h4>おやつ</h4>
                            {snackMenuList.map((menu, index) => (
                              <ul key={index}>
                                <li>{menu.name}</li>
                              </ul>
                            ))}
                          </div>
                        );
                      }
                    })()}
                  </div>
                );
              }
            })()}
          </SContainer>
        </SBlock>
      </SPosition>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});

const SBlock = styled("div")({
  border: "solid 1px",
  width: "700px",
  height: "150px",
  padding: "20px 30px",
});

const SBlock2 = styled("div")({
  width: "700px",
});

const SPosition = styled("div")({
  display: "flex",
  justifyContent: "center",
});
