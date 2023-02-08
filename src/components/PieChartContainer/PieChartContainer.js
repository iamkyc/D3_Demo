import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PieChart from "./PieChart";
import "../../App.css"

const INIT_DATA = [
  { category: "電源供應器", value: 47 },
  { category: "感測器", value: 32 },
  { category: "馬達", value: 11 },
  { category: "其他", value: 10 },
];

const INIT_FORMAT = { category: '', value: '' };
const WIDTH = 600;

const PieChartContainer = () => {
  const [data, setData] = useState(INIT_DATA);

  const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));

  const handleChange = (e, idx, column) => {
    const newArr = deepCopy(data);
    const { value } = e.target;
    newArr[idx][column] = value;
    setData(newArr);
  };

  const handleDelete = (idx) => {
    const newArr = deepCopy(data);
    newArr.splice(idx, 1);
    setData(newArr);
  }

  const handleCreate = () => {
    const newArr = deepCopy(data);
    newArr.push(INIT_FORMAT);
    setData(newArr);
  }

  return (
    <div className="sub-container">
      <h3>產品銷售類別分析表</h3>
      <div className="chart-area">
        <PieChart data={data} width={WIDTH} height={320} />
      </div>
      <TableContainer component={Paper} sx={{ maxWidth: WIDTH }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>類別名稱</TableCell>
              <TableCell>數值</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <TextField
                    size="small"
                    id={`category_${idx}`}
                    value={row.category}
                    onChange={(e) => handleChange(e, idx, 'category')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id={`value_${idx}`}
                    value={row.value}
                    sx={{ width: 100, textAlign: "end" }}
                    onChange={(e) => handleChange(e, idx, 'value')}
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <div className="delete-btn" onClick={() => handleDelete(idx)}>
                    <DeleteIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          onClick={() => handleCreate()}
          style={{ margin: "24px 16px" }}
        >
          新增欄位
        </Button>
      </TableContainer>
    </div>
  );
};

export default PieChartContainer;
