import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Top: FC = () => {
  const navigate = useNavigate();

  /**
   * 食材の登録ページに遷移.
   */
  const onClickRegisterFood = () => {
    navigate("/registerFood");
  };

  /**
   * 献立の記録ページに遷移.
   */
  const onClickRecordRecipes = () => {
    navigate("/recordRecipes");
  };

  return (
    <div>
      <div>冷蔵庫管理アプリ</div>
      <button onClick={onClickRegisterFood}>食材を登録する</button>
      <button onClick={onClickRecordRecipes}>今日の献立を記録する</button>
    </div>
  );
};
