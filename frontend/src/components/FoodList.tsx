import { FC, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFetchRefrigerator } from "../hooks/useFetchRefrigerator";

type Props = {
  bestBefore: Date | null;
};

export const FoodList: FC<Props> = (props) => {
  const { bestBefore } = props;
  const { foodList, getFoodList } = useFetchRefrigerator();

  useEffect(() => {
    getFoodList();
  }, [bestBefore]);

  return (
    <TableContainer sx={{ width: 560 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>食材名</TableCell>
            <TableCell align="right">数量</TableCell>
            <TableCell align="right">期限</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodList.map((food, index) => (
            <TableRow key={index}>
              <TableCell scope="row">{food.name}</TableCell>
              {(() => {
                if (food.qSelect === 1) {
                  return <TableCell align="right">{food.quantity}個</TableCell>;
                } else {
                  return <TableCell align="right">{food.quantity}g</TableCell>;
                }
              })()}
              <TableCell align="right">
                {String(food.purchaseDate).split("T")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
