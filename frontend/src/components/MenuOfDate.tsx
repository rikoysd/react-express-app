import { FC } from "react";
import { styled } from "@mui/material/styles";

export const MenuOfDate: FC = () => {
  return (
    <div>
      <h4>2022/07/20</h4>
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
