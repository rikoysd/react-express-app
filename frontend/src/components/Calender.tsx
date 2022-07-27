import { FC, useCallback, useContext, useEffect } from "react";
import FullCalendar, { DayCellContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { styled } from "@mui/material/styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

type Props = {
  calenderFlag: Boolean;
  setCalenderFlag: (boolean: boolean) => void;
  setCalenderDate: (string: string) => void;
};

export const Calender: FC<Props> = (props) => {
  const { calenderFlag, setCalenderFlag, setCalenderDate } = props;

  /**
   * 日付を選択.
   */
  const dateClick = useCallback((arg: DateClickArg) => {
    props.setCalenderDate(arg.dateStr);
    props.setCalenderFlag(true);
  }, []);

  return (
    <SContainer>
      <FullCalendar
        // 「日」の表示変更
        dayCellContent={(e: DayCellContentArg) => {
          e.dayNumberText = e.dayNumberText.replace("日", "");
        }}
        locale="ja"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={dateClick}
      />
    </SContainer>
  );
};

const SContainer = styled("div")({
  width: "450px",
});
