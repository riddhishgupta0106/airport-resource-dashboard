import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function DateResourceTable({
  dateData
}) {

  if (!dateData)
    return null;

  return (

    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
      }}
    >

      <h2>
        Date Wise Resource Analysis
      </h2>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Date
            </TableCell>

            <TableCell>
              Domestic GPU
            </TableCell>

            <TableCell>
              International GPU
            </TableCell>

            <TableCell>
              Domestic PCA
            </TableCell>

            <TableCell>
              International PCA
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {dateData.map((row) => (

            <TableRow key={row.date}>

              <TableCell>
                {row.date}
              </TableCell>

              <TableCell>
                {row.domesticGPUHours?.toFixed(1)}
              </TableCell>

              <TableCell>
                {row.internationalGPUHours?.toFixed(1)}
              </TableCell>

              <TableCell>
                {row.domesticPCAHours?.toFixed(1)}
              </TableCell>

              <TableCell>
                {row.internationalPCAHours?.toFixed(1)}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}

export default DateResourceTable;