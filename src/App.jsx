import DateGPUChart
from "./charts/DateGPUChart";

import DatePCAChart
from "./charts/DatePCAChart";

import DateResourceTable
from "./components/DateResourceTable";
import { Paper } from "@mui/material";
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


      useEffect(() => {

        if (rows.length === 0)
          return;
      
        const result =
          processData(
            filteredRows
          );
      
        setAnalytics(result);
      
      }, [
        selectedAirline,
        rows
      ]);

  const handleRowsLoaded =
    (data) => {

      setRows(data);

      const result =
        processData(data);

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
  return (

    <>

    

      <div
  style={{
    background:
  "linear-gradient(to bottom, #f8fafc, #eef2ff)",
    minHeight: "100vh",
    padding: "24px"
  }}
>
      <DashboardLayout>
      <div
  style={{
    marginBottom: "30px",
    textAlign: "center"
  }}
>

<h1
  style={{
    fontSize: "3rem",
    marginBottom: "10px",
    color: "#0f172a"
  }}
>
  ✈️ Airport Resource Analytics Dashboard
</h1>

<p
  style={{
    color: "#64748b",
    fontSize: "1.1rem"
  }}
>
  Flight Operations • GPU • PCA • Stand Utilization • Aircraft Analysis
</p>

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
        

        <Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <AirlineChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <LonghaulTurnaroundChart
    analytics={analytics}
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <ResourceChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <PCAChart
    airlineData={
      analytics?.airlineData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <GPUStandChart
    standData={
      analytics?.standData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <PCAStandChart
    standData={
      analytics?.standData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <AircraftGPUChart
    aircraftResourceData={
      analytics?.aircraftResourceData
    }
  />
</Paper>

<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
  <AircraftPCAChart
    aircraftResourceData={
      analytics?.aircraftResourceData
    }
  />
</Paper>

  <Paper
    elevation={3}
    sx={{ p: 3, mb: 4, borderRadius: 3 }}
  >
<AircraftResourceTable
  aircraftResourceData={
    analytics?.aircraftResourceData
  }
/>
</Paper>

      
<Paper
  elevation={3}
  sx={{ p: 3, mb: 4, borderRadius: 3 }}
>
        <AirlineAnalysis
          airlineData={
            analytics?.airlineData
          }
        />
</Paper>
<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
  <StandChart
    standData={analytics?.standData}
  />
</Paper>

<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
  <StandAnalysis
    standData={analytics?.standData}
  />
</Paper>

<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
  <DateChart
    dateData={analytics?.dateData}
  />
</Paper>

<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
  <DateAnalysis
    dateData={analytics?.dateData}
  />
</Paper>
<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
<DateGPUChart
  dateData={analytics?.dateData}
/>
</Paper>
<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
<DatePCAChart
  dateData={analytics?.dateData}
/>
</Paper>
<Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    borderRadius: 3
  }}
>
<DateResourceTable
  dateData={analytics?.dateData}
/>
</Paper>

      </DashboardLayout>

      </div>

    </>

  );
}

export default App;

