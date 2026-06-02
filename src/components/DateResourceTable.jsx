import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer
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
      <h2
        style={{
          textAlign: "center",
          color: "#111827",
          fontWeight: 700,
          fontSize: "1.6rem",
          marginBottom: "24px",
          marginTop: "0"
        }}
      >
        Date Wise Resource Analysis
      </h2>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f8fafc"
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>
                Date
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Domestic GPU
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                International GPU
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Domestic PCA
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
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
                  {row.domesticGPUHours?.toFixed(2)}
                </TableCell>

                <TableCell>
                  {row.internationalGPUHours?.toFixed(2)}
                </TableCell>

                <TableCell>
                  {row.domesticPCAHours?.toFixed(2)}
                </TableCell>

                <TableCell>
                  {row.internationalPCAHours?.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DateResourceTable;