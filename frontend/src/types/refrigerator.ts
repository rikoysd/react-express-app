export type Refrigerator = {
  // id
  foodId: number;
  // 名前
  name: string;
  // 購入日
  purchaseDate: Date;
  // 数量の選択
  qSelect: number;
  // 具体的な数量
  quantity: number;
  // 賞味期限
  bestBefore: Date;
};
