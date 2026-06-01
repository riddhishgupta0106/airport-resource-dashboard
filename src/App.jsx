<<<<<<< HEAD
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function App() {

  // =========================
  // STATES
  // =========================

  const [results, setResults] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [chargeErrors, setChargeErrors] = useState([]);
  const [abnormalEntries, setAbnormalEntries] = useState([]);
  const [delEntries, setDelEntries] = useState([]);
  const [overlaps, setOverlaps] = useState([]);

  const gpuRate = 2200;
  const pcaRate = 3300;

  const [abnormalHours, setAbnormalHours] = useState('');
  const [abnormalMinutes, setAbnormalMinutes] = useState('');

  const [selectedAirline, setSelectedAirline] =
    useState('Indigo');

  // =========================
  // ROUNDING LOGIC
  // =========================

  const calculateBilling = (
    value,
    airline
  ) => {

    const minimumBilling =
      airline === 'Indigo'
        ? 30
        : 20;

    if (value < minimumBilling) {
      return minimumBilling;
    }

    if (value % 10 === 0) {
      return value;
    }

    return (
      Math.ceil(value / 10) * 10
    );

  };

  // =========================
  // CHARGE ROUNDING
  // =========================

  const roundCharge = (value) => {

    const decimalPart = value % 1;

    if (decimalPart < 0.5) {
      return Math.floor(value);
    }

    return Math.ceil(value);

  };
  const excelDateToJSDate = (value) => {

    if (value instanceof Date) {
      return value;
    }
  
    if (typeof value === 'number') {
  
      return new Date(
        Math.round(
          (value - 25569) *
          86400 * 1000
        )
      );
  
    }
  
    return new Date(value);
  
  };
  
  const getTimeParts = (value) => {
  
    if (typeof value === 'number') {
  
      const totalMinutes =
        Math.round(
          value * 24 * 60
        );
  
      return {
        hour:
          Math.floor(
            totalMinutes / 60
          ),
        minute:
          totalMinutes % 60
      };
  
    }
  
    const parts =
      String(value)
        .trim()
        .split(':');
  
    return {
      hour:
        Number(parts[0]),
      minute:
        Number(parts[1])
    };
  
  };
  
  const buildInterval = (
    endDate,
    startTime,
    endTime
  ) => {
  
    const endDateObj =
      excelDateToJSDate(
        endDate
      );
  
    const startDateObj =
      new Date(endDateObj);
  
    const startParts =
      getTimeParts(
        startTime
      );
  
    const endParts =
      getTimeParts(
        endTime
      );
  
    const startMinutes =
      startParts.hour * 60 +
      startParts.minute;
  
    const endMinutes =
      endParts.hour * 60 +
      endParts.minute;
  
    if (
      endMinutes <
      startMinutes
    ) {
  
      startDateObj.setDate(
        startDateObj.getDate() - 1
      );
  
    }
  
    const startDateTime =
      new Date(startDateObj);
  
    startDateTime.setHours(
      startParts.hour,
      startParts.minute,
      0,
      0
    );
  
    const endDateTime =
      new Date(endDateObj);
  
    endDateTime.setHours(
      endParts.hour,
      endParts.minute,
      0,
      0
    );
  
    return {
      startDateTime,
      endDateTime
    };
  
  };
  const formatTime = (value) => {

    if (typeof value === 'number') {
  
      const totalMinutes =
        Math.round(value * 24 * 60);
  
      const hours =
        Math.floor(totalMinutes / 60);
  
      const minutes =
        totalMinutes % 60;
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
    }
  
    return String(value);
  
  };
  
  // =========================
  // FILE UPLOAD
  // =========================
  

  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

      const data =
        new Uint8Array(
          event.target.result
        );

      const workbook =
        XLSX.read(data, {
          type: 'array',
        });

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const rows =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,
            defval: '',
          }
        );

      // =========================
      // COLUMN DETECTION
      // =========================

      let actualIndex = 11;
      let billedIndex = 12;

      let endDateIndex = 2;
      let originIndex = 3;
      let destinationIndex = 4;
      let flightIndex = 5;
      let regnIndex = 7;
      let bayIndex = 8;
      let startTimeIndex = 9;
      let endTimeIndex = 10;
      let chargesIndex = 13;

      // =========================
      // AUTO DETECT
      // =========================

      for (let i = 0; i < 30; i++) {

        const row = rows[i];

        if (!row) continue;

        row.forEach((cell, idx) => {

          const text =
            String(cell)
              .toLowerCase()
              .trim();

          if (text.includes('actual')) {
            actualIndex = idx;
          }

          if (
            text.includes('billed') ||
            text.includes('billing')
          ) {
            billedIndex = idx;
          }

          if (text.includes('flight')) {
            flightIndex = idx;
          }

          if (text.includes('regn')) {
            regnIndex = idx;
          }

          if (text.includes('bay')) {
            bayIndex = idx;
          }

          if (text.includes('origin')) {
            originIndex = idx;
          }

          if (
            text.includes('destination') ||
            text.includes('dest')
          ) {
            destinationIndex = idx;
          }

          if (text.includes('end date')) {
            endDateIndex = idx;
          }

          if (text.includes('start time')) {
            startTimeIndex = idx;
          }

          if (text.includes('end time')) {
            endTimeIndex = idx;
          }

          if (text.includes('charge')) {
            chargesIndex = idx;
          }

        });

      }

      // =========================
      // ARRAYS
      // =========================

      let mismatches = [];
      let duplicateFlights = [];
      let chargeMismatchRows = [];
      let abnormalUsageRows = [];
      let delRows = [];
      let overlapRows = [];

      // =========================
      // MAPS
      // =========================

      const gpuFlightSet = new Map();
      const pcaFlightSet = new Map();
      const overlapMap = new Map();

      // =========================
      // SECTION TRACKER
      // =========================

      let currentSection = '';

      // =========================
      // PROCESS ROWS
      // =========================

      rows.forEach((row, index) => {

        if (!row || row.length === 0) {
          return;
        }

        const rowText =
          row.join(' ')
            .toLowerCase();

        // SECTION DETECTION

        if (rowText.includes('gpu')) {

          currentSection = 'GPU';
          return;

        }

        if (rowText.includes('pca')) {

          currentSection = 'PCA';
          return;

        }

        // SKIP TOTALS

        if (rowText.includes('total')) {
          return;
        }

        const actualValue =
          row[actualIndex];

        const billedValue =
          row[billedIndex];

        // SKIP BLANKS

        if (
          actualValue === '' &&
          billedValue === ''
        ) {
          return;
        }

        // SKIP HEADERS

        if (
          String(actualValue)
            .toLowerCase()
            .includes('actual') ||

          String(billedValue)
            .toLowerCase()
            .includes('billed')
        ) {
          return;
        }

        const actual =
          Number(actualValue);

        const billed =
          Number(billedValue);

        if (
          isNaN(actual) ||
          isNaN(billed)
        ) {
          return;
        }

        // =========================
        // ROUND OFF CHECK
        // =========================

        const expected =
          calculateBilling(
            actual,
            selectedAirline
          );

        if (expected !== billed) {

          mismatches.push({
            row: index + 1,
            type: currentSection,
            actual,
            billed,
            expected,
          });

        }

        // =========================
        // DEL CHECK
        // =========================

        const origin =
          String(
            row[originIndex] || ''
          )
            .trim()
            .toUpperCase();

        const destination =
          String(
            row[destinationIndex] || ''
          )
            .trim()
            .toUpperCase();

        if (
          origin === 'DEL' ||
          destination === 'DEL'
        ) {

          delRows.push({
            row: index + 1,
            type: currentSection,
            origin,
            destination,
            flight: row[flightIndex],
            bay: row[bayIndex],
          });

        }

        // =========================
        // ABNORMAL USAGE
        // =========================

        const abnormalLimitMinutes =
          (
            Number(abnormalHours || 0) * 60
          ) +
          Number(abnormalMinutes || 0);

        if (
          actual >
          abnormalLimitMinutes
        ) {

          abnormalUsageRows.push({
            row: index + 1,
            type: currentSection,
            actual,
          });

        }

        // =========================
        // CHARGES CHECK
        // =========================

        const excelCharge =
          Number(
            row[chargesIndex]
          );

        if (!isNaN(excelCharge)) {

          let hourlyRate = 0;

          if (
            currentSection === 'GPU'
          ) {

            hourlyRate =2200;

          } else if (
            currentSection === 'PCA'
          ) {

            hourlyRate =3300;

          }

          if (hourlyRate > 0) {

            const perMinuteRate =
              hourlyRate / 60;

            const rawCharge =
              billed *
              perMinuteRate;

            const calculatedCharge =
              roundCharge(
                rawCharge
              );

            if (
              calculatedCharge !==
              excelCharge
            ) {

              chargeMismatchRows.push({
                row: index + 1,
                type: currentSection,
                excel: excelCharge,
                calculated:
                  calculatedCharge,
              });

            }

          }

        }

        // =========================
        // DUPLICATE CHECK
        // =========================

        const rowType =
          currentSection;

        if (!rowType) {
          return;
        }

        const currentSet =
          rowType === 'GPU'
            ? gpuFlightSet
            : pcaFlightSet;

        const endDate =
          row[endDateIndex];

        const flightNumber =
          row[flightIndex];

          const regn =
          row[regnIndex];
        
        const bayNumber =
          row[bayIndex];
        
        const startTimeValue =
          row[startTimeIndex];
      
      const endTimeValue =
        row[endTimeIndex];
      
      const endDateValue =
        row[endDateIndex];
      
      if (
        startTimeValue &&
        endTimeValue &&
        endDateValue &&
        flightNumber &&
        regn &&
        bayNumber
      ) {
      
        const {
          startDateTime,
          endDateTime
        } = buildInterval(
          endDateValue,
          startTimeValue,
          endTimeValue
        );
      
        const overlapKey =
`${String(currentSection).trim().toUpperCase()}|
${String(flightNumber).replace(/\s+/g,'').toUpperCase()}|
${String(regn).trim().toUpperCase()}|
${String(bayNumber).trim()}`;      
        if (
          !overlapMap.has(
            overlapKey
          )
        ) {
      
          overlapMap.set(
            overlapKey,
            []
          );
      
        }
      
        overlapMap
          .get(overlapKey)
          .push({
      
            row:
              index + 1,
      
            start:
              startDateTime,
      
            end:
              endDateTime,
      
            type:
              currentSection,
      
            flight:
              flightNumber,
      
            regn,
      
            bay:
              bayNumber,
      
            range:
`${formatTime(startTimeValue)} - ${formatTime(endTimeValue)}`
      
          });
      
      }
        

        const startTime =
          row[startTimeIndex];

        const endTime =
          row[endTimeIndex];

        const uniqueKey = `
${endDate}|
${flightNumber}|
${regn}|
${bayNumber}|
${startTime}|
${endTime}
`;

        if (
          endDate &&
          flightNumber &&
          regn &&
          bayNumber &&
          startTime &&
          endTime
        ) {

          if (
            currentSet.has(uniqueKey)
          ) {

            const existingData =
              currentSet.get(uniqueKey);

            existingData.rows.push(
              index + 1
            );

          } else {

            currentSet.set(
              uniqueKey,
              {
                rows: [index + 1],
                type: rowType,
                flightNumber,
                regn,
                bayNumber,
              }
            );

          }

        }

      });

      // =========================
      // EXTRACT DUPLICATES
      // =========================

      [
        ...gpuFlightSet.values(),
        ...pcaFlightSet.values(),
      ].forEach((item) => {

        if (
          item.rows.length > 1
        ) {

          duplicateFlights.push({
            rows:
              item.rows.join(', '),
            type:
              item.type,
            flightNumber:
              item.flightNumber,
            regn:
              item.regn,
            bayNumber:
              item.bayNumber,
          });

        }

      });

      overlapMap.forEach(
        (records) => {
          records = records.filter(
            r =>
              r.start instanceof Date &&
              r.end instanceof Date
          );

          records.sort(
            (a, b) =>
              a.start - b.start
          );
      
          for (
            let i = 0;
            i < records.length;
            i++
          ) {
      
            for (
              let j = i + 1;
              j < records.length;
              j++
            ) {
      
              const a =
                records[i];
      
              const b =
                records[j];
      
                if (
                  a.start < b.end &&
                  b.start < a.end
                ) {
      
                overlapRows.push({
      
                  row1:
                    a.row,
      
                  row2:
                    b.row,
      
                  type:
                    a.type,
      
                  flight:
                    a.flight,
      
                  regn:
                    a.regn,
      
                  bay:
                    a.bay,
      
                  range1:
                    a.range,
      
                  range2:
                    b.range,
      
                });
      
              }
      
            }
      
          }
      
        }
      );
      


      // =========================
      // SAVE
      // =========================

      setResults(mismatches);

      setDuplicates(
        duplicateFlights
      );

      setChargeErrors(
        chargeMismatchRows
      );

      setAbnormalEntries(
        abnormalUsageRows
      );

      setDelEntries(delRows);
      setOverlaps(
        overlapRows
      );

    };

    reader.readAsArrayBuffer(file);

  };

  // =========================
  // UI
  // =========================

  return (

    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial',
        backgroundColor: '#000000',
        minHeight: '100vh',
        color: 'white',
      }}
    >

      <h1
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '42px',
        }}
      >
        BME Excel Checker
      </h1>

      <p
        style={{
          textAlign: 'center',
          color: 'lightgray',
          marginBottom: '30px',
        }}
      >
        Files are processed locally in browser.
        No Excel data is uploaded or stored.
      </p>

      {/* AIRLINE */}

      <div
        style={{
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >

        <label
          style={{
            marginRight: '10px',
            fontWeight: 'bold',
          }}
        >
          Airline
        </label>

        <select
          value={selectedAirline}
          onChange={(e) =>
            setSelectedAirline(
              e.target.value
            )
          }
          style={{
            padding: '8px',
            fontSize: '16px',
          }}
        >

          <option value="Indigo">
            Indigo
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>

      <div
  style={{
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#60a5fa',
  }}
>
  Fixed Billing Rates: GPU ₹2200/hour | PCA ₹3300/hour
</div>
      

      {/* ABNORMAL */}

      <div
        style={{
          marginBottom: '30px',
        }}
      >

        <h3
          style={{
            textAlign: 'center',
          }}
        >
          Minimum Abnormal Usage
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
          }}
        >

          <input
            type="number"
            placeholder="Hours"
            value={abnormalHours}
            onChange={(e) =>
              setAbnormalHours(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Minutes"
            value={abnormalMinutes}
            onChange={(e) =>
              setAbnormalMinutes(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* FILE */}

      <div
        style={{
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleUpload}
        />

      </div>

      {/* ROUND OFF CHECKER */}

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Round Off Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          marginBottom: '50px',
          borderCollapse: 'collapse',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#1e40af',
          }}
        >

          <tr>
            <th>Row</th>
            <th>Type</th>
            <th>Actual Usage</th>
            <th>Billed Usage</th>
            <th>Expected Usage</th>
          </tr>

        </thead>

        <tbody>

          {results.length > 0 ? (

            results.map((item, idx) => (

              <tr key={idx}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.actual}</td>
                <td>{item.billed}</td>
                <td>{item.expected}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="5">
                No rounding mismatches found
              </td>

            </tr>

          )}

        </tbody>

      </table>

     

      {/* CHARGE CHECKER */}

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Charges Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          marginBottom: '50px',
          borderCollapse: 'collapse',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#059669',
          }}
        >

          <tr>
            <th>Row</th>
            <th>Type</th>
            <th>Excel Charge</th>
            <th>Calculated Charge</th>
          </tr>

        </thead>

        <tbody>

          {chargeErrors.length > 0 ? (

            chargeErrors.map((item, idx) => (

              <tr key={idx}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.excel}</td>
                <td>{item.calculated}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="4">
                No charge mismatches found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* ABNORMAL */}

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Abnormal Usage Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          marginBottom: '50px',
          borderCollapse: 'collapse',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#9333ea',
          }}
        >

          <tr>
            <th>Row</th>
            <th>Type</th>
            <th>Actual Usage</th>
          </tr>

        </thead>

        <tbody>

          {abnormalEntries.length > 0 ? (

            abnormalEntries.map((item, idx) => (

              <tr key={idx}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.actual}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="3">
                No abnormal usage found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* DEL CHECKER */}

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        DEL Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          marginBottom: '50px',
          borderCollapse: 'collapse',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#ea580c',
          }}
        >

          <tr>
            <th>Row</th>
            <th>Type</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Flight</th>
            <th>Bay</th>
          </tr>

        </thead>

        <tbody>

          {delEntries.length > 0 ? (

            delEntries.map((item, idx) => (

              <tr key={idx}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td>{item.flight}</td>
                <td>{item.bay}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="6">
                No DEL entries found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      <h2
  style={{
    textAlign: 'center',
    marginBottom: '20px',
  }}
>
  Overlap Usage and Repitition Checker
</h2>

<table
  border="1"
  cellPadding="10"
  style={{
    width: '100%',
    marginBottom: '50px',
    borderCollapse: 'collapse',
    color: 'white',
  }}
>

  <thead
    style={{
      backgroundColor: '#7c3aed',
    }}
  >

    <tr>

      <th>Row 1</th>
      <th>Row 2</th>
      <th>Type</th>
      <th>Flight</th>
      <th>REGN</th>
      <th>Bay</th>
      <th>Time Range 1</th>
      <th>Time Range 2</th>

    </tr>

  </thead>

  <tbody>

    {overlaps.length > 0 ? (

      overlaps.map(
        (item, idx) => (

          <tr key={idx}>

            <td>{item.row1}</td>
            <td>{item.row2}</td>
            <td>{item.type}</td>
            <td>{item.flight}</td>
            <td>{item.regn}</td>
            <td>{item.bay}</td>
            <td>{item.range1}</td>
            <td>{item.range2}</td>

          </tr>

        )
      )

    ) : (

      <tr>

        <td colSpan="8">
          No overlapping usage found
        </td>

      </tr>

    )}

  </tbody>

</table>

    </div>

  );

}
=======
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


  selectedAirline === "ALL"

    ? rows

    : rows.filter(
        (row) =>
          row["AIR LINES"] ===
          selectedAirline
      );
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
>>>>>>> 1c5178a57b78415d30fdcf72a660ac727ab9cad7
