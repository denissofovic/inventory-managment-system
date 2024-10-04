import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Columns from "../../models/genericColumns";
import styles from "./tableStyles";

interface TableProps<T> {
  data: T[];
  config: Columns<T>[];
}

function GenericTable<T>(props: TableProps<T>) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table sx={{ ...styles.table }}>
        <TableHead sx={{ ...styles.tableHead }}>
          <TableRow>
            {props.config.map((column, key) => {
              return (
                <TableCell sx={{ ...styles.headCell }} align="center" key={key}>
                  {column.getHeader()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((item, key) => {
            return (
              <TableRow key={key + "1"}>
                {props.config.map((column, key) => {
                  return (
                    <TableCell
                      sx={{ ...styles.bodyCell }}
                      align="center"
                      key={key + "2"}
                    >
                      {column.getValue(item)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      
    </div>
  );
}

export default GenericTable;
