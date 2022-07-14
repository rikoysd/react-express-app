import { FC, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetchRefrigerator } from "../hooks/useFetchRefrigerator";
import { styled } from "@mui/material/styles";

export const FoodList: FC = () => {
  const { foodList, getFoodList } = useFetchRefrigerator();

  useEffect(() => {
    getFoodList();
  }, []);

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
          {foodList.map((food) => (
            <TableRow key={food.foodId}>
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
