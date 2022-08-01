import { FC, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { useFetchMealById } from "../hooks/useFetchMealById";
import type { Menu } from "../types/menu";
import type { User } from "../types/user";

type Props = {
  calenderFlag: boolean;
  calenderDate: string;
  displayMenuList: Array<Menu>;
  loginUser: User;
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
      await getMealById(props.loginUser.userId, nowDateStr);
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
        await getMealById(props.loginUser.userId, newDate);
      })();
    },
    [morningMenuList]
  );

  useEffect(() => {}, [morningMenuList, props.displayMenuList, flag]);

  return (
    <div style={{ marginBottom: "60px" }}>
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
          <div>
            {(() => {
              if (mealListById.length === 0) {
                return <div>メニューが登録されていません</div>;
              } else {
                return (
                  <SContainer>
                    {(() => {
                      if (morningMenuList.length !== 0) {
                        return (
                          <SCategory>
                            <h4>朝食</h4>
                            <ul>
                              {morningMenuList.map((menu, index) => (
                                <li key={index}>{menu.name}</li>
                              ))}
                            </ul>
                          </SCategory>
                        );
                      }
                    })()}
                    {(() => {
                      if (lunchMenuList.length !== 0) {
                        return (
                          <SCategory>
                            <h4>昼食</h4>
                            <ul>
                              {lunchMenuList.map((menu, index) => (
                                <li key={index}>{menu.name}</li>
                              ))}
                            </ul>
                          </SCategory>
                        );
                      }
                    })()}
                    {(() => {
                      if (dinnerMenuList.length !== 0) {
                        return (
                          <SCategory>
                            <h4>夕食</h4>
                            <ul>
                              {dinnerMenuList.map((menu, index) => (
                                <li key={index}>{menu.name}</li>
                              ))}
                            </ul>
                          </SCategory>
                        );
                      }
                    })()}
                    {(() => {
                      if (snackMenuList.length !== 0) {
                        return (
                          <SCategory>
                            <h4>おやつ</h4>
                            <ul>
                              {snackMenuList.map((menu, index) => (
                                <li key={index}>{menu.name}</li>
                              ))}
                            </ul>
                          </SCategory>
                        );
                      }
                    })()}
                  </SContainer>
                );
              }
            })()}
          </div>
        </SBlock>
      </SPosition>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});

const SBlock = styled("div")({
  backgroundColor: "#FFF5DD",
  minWidth: "700px",
  minHeight: "150px",
  padding: "20px 30px",
});

const SBlock2 = styled("div")({
  width: "700px",
});

const SPosition = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SCategory = styled("div")({
  minWidth: "200px",
  padding: "0 30px",
});
