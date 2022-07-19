import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { styled } from "@mui/material/styles";

export const Calender: FC = () => {
  return (
    <SContainer>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </SContainer>
  );
};

const SContainer = styled("div")({
  width: "450px",
});
