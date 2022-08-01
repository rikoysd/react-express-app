import type { Refrigerator } from "./refrigerator";

export type Menu = {
  // id
  menuId: number;
  // 料理名
  name: string;
  // 食材リスト
  foodList: Array<Refrigerator>;
};
