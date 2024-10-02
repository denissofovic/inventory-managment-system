import {
  
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Columns from "../../models/genericColumns";

interface TableProps<T> {
  data: T[];
  config: Columns<T>[];
}

function GenericTable<T>(props: TableProps<T>) {
  return (
    <>
      <Table sx={{borderSpacing:'0 10px',borderCollapse:'separate'}}>
        <TableHead sx={{background:'#fff',borderRadius:'4px',boxShadow:'0px 3px 6px rgba(0, 0, 0, 0.16)'}}>
          <TableRow>
            {props.config.map((column, key) => {
              return (
                <TableCell
                  sx={{ padding: 0, margin: "5px", fontWeight: "bold" }}
                  align="center"
                  key={key}
                >
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
                      sx={{ padding: 0, margin: "5px" }}
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
    </>
  );
}

export default GenericTable;
