import {
  Paper,
  Typography
} from "@mui/material";
import * as XLSX from "xlsx";

function StandSummaryTable({
  analytics
}) {

  if (!analytics)
    return null;

  const rows = [

    [
      "Date Range",
      analytics.dateRange
    ],

    [
      "Total PBB Flights",
      analytics.totalPBBFlights
    ],

    [
      "Total Domestic PBB Flights",
      analytics.domesticPBBFlights
    ],

    [
      "Total Domestic PBB Code A Flights",
      analytics.domesticPBBCodeAFlights
    ],

    [
      "Total Domestic PBB Code C Flights",
      analytics.domesticPBBCodeCFlights
    ],

    [
      "Total Domestic PBB Code E Flights",
      analytics.domesticPBBCodeEFlights
    ],

    [
      "Total International PBB Flights",
      analytics.internationalPBBFlights
    ],

    [
      "Total International PBB Code A Flights",
      analytics.internationalPBBCodeAFlights
    ],

    [
      "Total International PBB Code C Flights",
      analytics.internationalPBBCodeCFlights
    ],

    [
      "Total International PBB Code E Flights",
      analytics.internationalPBBCodeEFlights
    ],

    [
      "Total Remote Flights",
      analytics.remoteFlights
    ],

    [
      "Total Remote Code A Flights",
      analytics.remoteCodeAFlights
    ],

    [
      "Total Remote Code C Flights",
      analytics.remoteCodeCFlights
    ],

    [
      "Total Remote Code E Flights",
      analytics.remoteCodeEFlights
    ]

  ];
  const downloadExcel = () => {

    const excelData =
      rows.map(
        ([parameter, value]) => ({
          Parameter: parameter,
          Value: value
        })
      );
  
    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );
  
    const workbook =
      XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Stand Summary"
    );
  
    XLSX.writeFile(
      workbook,
      "Stand_Summary.xlsx"
    );
  
  };

  return (

    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 4
      }}
    >

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#7c3aed"
        }}
      >
        PBB / Remote Summary
      </Typography>
      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px"
  }}
>

  <button
    onClick={downloadExcel}
    style={{
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      background: "#16a34a",
      color: "white",
      cursor: "pointer",
      fontWeight: "600"
    }}
  >
    📊 Download Excel
  </button>

</div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <tbody>

          {rows.map(
            ([label, value]) => (

              <tr key={label}>

                <td
                  style={{
                    border:
                      "1px solid #e5e7eb",
                    padding: "12px",
                    fontWeight: 600,
                    background:
                      "#f8fafc"
                  }}
                >
                  {label}
                </td>

                <td
                  style={{
                    border:
                      "1px solid #e5e7eb",
                    padding: "12px"
                  }}
                >
                  {value ?? 0}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </Paper>

  );

}

export default StandSummaryTable;