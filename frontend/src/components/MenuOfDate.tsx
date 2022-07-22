import { FC, useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

type Props = {
  calenderFlag: Boolean;
  calenderDate: String;
};

export const MenuOfDate: FC<Props> = (props) => {
  const { calenderFlag } = props;
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const nowDate = new Date();
    const nowDateStr = format(nowDate, "yyyy-MM-dd");
    setDate(nowDateStr);
  }, [props.calenderDate, calenderFlag]);

  return (
    <div>
      {(() => {
        if (props.calenderFlag === true) {
          return <h4>{props.calenderDate}</h4>;
        } else {
          return <h4>{date}</h4>;
        }
      })()}
      <SContainer>
        <div>
          <h4>朝食</h4>
          <ul>
            <li>ご飯</li>
            <li>味噌汁</li>
            <li>納豆</li>
          </ul>
        </div>
        <div>
          <h4>昼食</h4>
          <ul>
            <li>オムライス</li>
            <li>サラダ</li>
          </ul>
        </div>
        <div>
          <h4>夕食</h4>
          <ul>
            <li>肉じゃが</li>
            <li>サラダ</li>
            <li>わかめスープ</li>
          </ul>
        </div>
      </SContainer>
    </div>
  );
};

const SContainer = styled("div")({
  display: "flex",
});
