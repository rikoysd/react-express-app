import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { styled } from "@mui/material/styles";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

export const Calender: FC = () => {
  const dateClick = (arg: DateClickArg) => {
    console.log(arg.dateStr);
  };

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
