import StandSummaryTable
from "./components/StandSummaryTable";
import html2canvas
from "html2canvas";
import AverageUsageKPIs
from "./components/AverageUsageKPIs";
import AirlineUtilizationGrid
from "./components/AirlineUtilizationGrid";
import DateGPUChart
from "./charts/DateGPUChart";

import DatePCAChart
from "./charts/DatePCAChart";

import DateResourceTable
from "./components/DateResourceTable";
import { Paper, Grid } from "@mui/material";
import LonghaulTurnaroundChart
from "./charts/LonghaulTurnaroundChart";
import AircraftGPUChart from "./charts/AircraftGPUChart";
import AircraftPCAChart from "./charts/AircraftPCAChart";

import AircraftResourceTable from "./components/AircraftResourceTable";
import GPUStandChart from "./charts/GPUStandChart";
import PCAStandChart from "./charts/PCAStandChart";
import PCAChart
from "./charts/PCAChart";
import ResourceChart
from "./charts/ResourceChart";
import FilterPanel from "./components/FilterPanel";
import DateChart from "./charts/DateChart";
import DateAnalysis from "./components/DateAnalysis";

import StandAnalysis
from "./components/StandAnalysis";

import StandChart
from "./charts/StandChart";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import DashboardLayout from "./components/DashboardLayout";

import UploadSection from "./components/UploadSection";
import SummaryCards from "./components/SummaryCards";
import AirlineAnalysis from "./components/AirlineAnalysis";

import AirlineChart from "./charts/AirlineChart";

import { processData }
from "./services/excelProcessor";


function App() {

  const [rows, setRows] =
    useState([]);

  const [analytics,
    setAnalytics] =
    useState(null);
    const [
      selectedAirline,
      setSelectedAirline
    ] = useState("ALL");
    const [
      selectedAirport,
      setSelectedAirport
    ] = useState("HYDERABAD");
    const airportConfig = {

      HYDERABAD: {

        domesticPBB: [
          "3","4","5","6","7","8","9",
          "13","14",
          "42","43","44","45","46","47",
          "48","49","50","51","52","53","54"
        ],
      
        internationalPBB: [
          "55","56","57","58",
          "59","60","61","62","63","64",
          "66","67","68","69"
        ]
      
      },
    
      DELHI: {
    
        domesticPBB: [],
    
        internationalPBB: []
    
      },
    
      GOA: {
    
        domesticPBB: [],
    
        internationalPBB: []
    
      }
    
    };


      useEffect(() => {

        if (rows.length === 0)
          return;
      
        const result =
processData(
  filteredRows,
  airportConfig[
    selectedAirport
  ].domesticPBB,
  airportConfig[
    selectedAirport
  ].internationalPBB
);
      
        setAnalytics(result);
      
      }, [
        selectedAirline,
        selectedAirport,
        rows
      ]);
  const handleRowsLoaded =
    (data) => {

      setRows(data);

      const result =
processData(
  data,
  airportConfig[
    selectedAirport
  ].domesticPBB,
  airportConfig[
    selectedAirport
  ].internationalPBB
);

      setAnalytics(result);
    };
    const filteredRows =

  selectedAirline === "ALL"

    ? rows

    : rows.filter(
        (row) =>
          row["AIR LINES"] ===
          selectedAirline
      );
    const airlines =

  analytics?.airlineData
    ?.map(
      (item) =>
        item.airline
    ) || [];
    const downloadDashboardHTML = () => {

      const dashboard =
        document.getElementById(
          "dashboard-export"
        );
    
      const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Airport Dashboard</title>
    </head>
    
    <body>
    ${dashboard.outerHTML}
    </body>
    
    </html>
    `;
    
      const blob =
        new Blob(
          [htmlContent],
          {
            type: "text/html"
          }
        );
    
      const link =
        document.createElement("a");
    
      link.href =
        URL.createObjectURL(blob);
    
      link.download =
        "Airport_Dashboard.html";
    
      link.click();
    
    };
  return (

    <>

    

      <div
  style={{
    background:
  "linear-gradient(to bottom, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    padding: "24px"
  }}
><DashboardLayout>
<div id="dashboard-export">
<div
  style={{
    marginBottom: "50px",
    textAlign: "center",
    paddingTop: "10px"
  }}
>

<h1
  style={{
    fontSize: "3rem",
    color: "#0f172a",
    marginBottom: "25px",
    fontWeight: 700
  }}
>
  ✈️ Airport Resource Analytics Dashboard
</h1>
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px"
  }}
>

<p
  style={{
    color: "#64748b",
    fontSize: "1.15rem",
    marginBottom: "30px",
    marginTop: 0
  }}
>
  Flight Operations • GPU • PCA • Stand Utilization • Aircraft Analysis
</p>
<button
  onClick={downloadDashboardHTML}
  style={{
    padding: "14px 32px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow:
      "0 6px 18px rgba(37,99,235,0.25)"
  }}
>
  🌐 Download Dashboard
</button>

</div>

</div>

<div
  style={{
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "40px"
  }}
>

  <UploadSection
    setRows={
      handleRowsLoaded
    }
  />

  <h3>
    Rows Loaded : {rows.length}
  </h3>
  <div
  style={{
    marginBottom: "20px"
  }}
>

  <label
    style={{
      fontWeight: 600,
      marginRight: "10px"
    }}
  >
    Airport:
  </label>

  <select
    value={selectedAirport}
    onChange={(e) =>
      setSelectedAirport(
        e.target.value
      )
    }
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}
  >

    <option value="HYDERABAD">
      Hyderabad
    </option>

    <option value="DELHI">
      Delhi
    </option>

    <option value="GOA">
      Goa
    </option>

  </select>

</div>
  <FilterPanel
    airlines={airlines}
    selectedAirline={
      selectedAirline
    }
    setSelectedAirline={
      setSelectedAirline
    }
  />

</div>
        <SummaryCards
          analytics={
            analytics
          }
        />
        <AverageUsageKPIs
  rows={filteredRows}
/>
        <Paper
  elevation={3}
  sx={{
    p: 4,
    mb: 5,
    borderRadius: 4
  }}
>
  <AirlineUtilizationGrid
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>
        

        <Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <AirlineChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <LonghaulTurnaroundChart
    analytics={analytics}
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <ResourceChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <PCAChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <GPUStandChart
    standData={
      analytics?.standData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <PCAStandChart
    standData={
      analytics?.standData
    }
  />
</Paper>

<Grid
  container
  spacing={3}
  sx={{
    mb: 5,
    width: "100%"
  }}
>

  <Grid size={{ xs: 12, md: 6 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: 520,
        width: "100%"
      }}
    >
      <AircraftGPUChart
        aircraftResourceData={
          analytics?.aircraftResourceData
        }
      />
    </Paper>
  </Grid>

  <Grid size={{ xs: 12, md: 6 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: 520,
        width: "100%"
      }}
    >
      <AircraftPCAChart
        aircraftResourceData={
          analytics?.aircraftResourceData
        }
      />
    </Paper>
  </Grid>

</Grid>

  <Paper
    elevation={3}
    sx={{ p: 4, mb: 5, borderRadius: 4 }}
  >
<AircraftResourceTable
  aircraftResourceData={
    analytics?.aircraftResourceData
  }
/>
</Paper>

      
<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
        <AirlineAnalysis
          airlineData={
            analytics?.airlineData
          }
        />
</Paper>
<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <StandChart
    standData={analytics?.standData}
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <StandAnalysis
    standData={analytics?.standData}
  />
  <Paper
  elevation={3}
  sx={{
    p: 4,
    mb: 5,
    borderRadius: 4
  }}
>
  <StandSummaryTable
    analytics={analytics}
  />
</Paper>
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <DateChart
    dateData={analytics?.dateData}
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
  <DateAnalysis
    dateData={analytics?.dateData}
  />
</Paper>
<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
<DateGPUChart
  dateData={analytics?.dateData}
/>
</Paper>
<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
<DatePCAChart
  dateData={analytics?.dateData}
/>
</Paper>
<Paper
  elevation={3}
  sx={{ p: 4, mb: 5, borderRadius: 4 }}
>
<DateResourceTable
  dateData={analytics?.dateData}
/>
</Paper>

</div>
</DashboardLayout>

      </div>

    </>

  );
}

export default App;

