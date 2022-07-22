import { FC, useCallback, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { styled } from "@mui/material/styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

type Props = {
  calenderFlag: Boolean;
  setCalenderFlag: (boolean: boolean) => void;
  setCalenderDate: (string: string) => void;
};

export const Calender: FC<Props> = (props) => {
  const { calenderFlag, setCalenderFlag } = props;

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
