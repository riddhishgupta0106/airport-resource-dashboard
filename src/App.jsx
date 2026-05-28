import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function App() {

  // =========================
  // STATES
  // =========================

  const [results, setResults] =
    useState([]);

  const [duplicates, setDuplicates] =
    useState([]);

  const [chargeErrors, setChargeErrors] =
    useState([]);

  const [abnormalEntries, setAbnormalEntries] =
    useState([]);

  const [delEntries, setDelEntries] =
    useState([]);

  const [gpuRate, setGpuRate] =
    useState('');

  const [pcaRate, setPcaRate] =
    useState('');

  const [abnormalHours, setAbnormalHours] =
    useState('');

  const [abnormalMinutes, setAbnormalMinutes] =
    useState('');

  // =========================
  // ROUNDING LOGIC
  // =========================

  const calculateBilling = (value) => {

    if (value < 30) {
      return 30;
    }

    if (value % 10 === 0) {
      return value;
    }

    return Math.ceil(value / 10) * 10;

  };

  // =========================
  // CUSTOM CHARGE ROUNDING
  // =========================

  const roundCharge = (value) => {

    const decimalPart =
      value % 1;

    if (decimalPart < 0.5) {
      return Math.floor(value);
    }

    return Math.ceil(value);

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

      // Auto detect columns

      for (
        let i = 0;
        i < 30;
        i++
      ) {

        const row = rows[i];

        if (!row) continue;

        row.forEach(
          (cell, idx) => {

            const text =
              String(cell)
                .toLowerCase()
                .trim();

            if (
              text.includes('actual')
            ) {
              actualIndex = idx;
            }

            if (
              text.includes('billed') ||
              text.includes('billing')
            ) {
              billedIndex = idx;
            }

            if (
              text.includes('flight')
            ) {
              flightIndex = idx;
            }

            if (
              text.includes('regn')
            ) {
              regnIndex = idx;
            }

            if (
              text.includes('bay')
            ) {
              bayIndex = idx;
            }

            if (
              text.includes('origin')
            ) {
              originIndex = idx;
            }

            if (
              text.includes('destination') ||
              text.includes('dest')
            ) {
              destinationIndex = idx;
            }

            if (
              text.includes('end date')
            ) {
              endDateIndex = idx;
            }

            if (
              text.includes('start time')
            ) {
              startTimeIndex = idx;
            }

            if (
              text.includes('end time')
            ) {
              endTimeIndex = idx;
            }

            if (
              text.includes('charge')
            ) {
              chargesIndex = idx;
            }

          }
        );

      }

      // =========================
      // ARRAYS
      // =========================

      let mismatches = [];

      let duplicateFlights = [];

      let chargeErrors = [];

      let abnormalUsageRows = [];

      let delRows = [];

      // =========================
      // MAPS
      // =========================

      const gpuFlightSet =
        new Map();

      const pcaFlightSet =
        new Map();

      // =========================
      // TRACK SECTION
      // =========================

      let currentSection = '';

      // =========================
      // PROCESS ROWS
      // =========================

      rows.forEach(
        (row, index) => {

          if (
            !row ||
            row.length === 0
          ) {
            return;
          }

          const rowText =
            row.join(' ')
              .toLowerCase();

          // GPU Section

          if (
            rowText.includes('gpu')
          ) {

            currentSection =
              'GPU';

            return;

          }

          // PCA Section

          if (
            rowText.includes('pca')
          ) {

            currentSection =
              'PCA';

            return;

          }

          // Skip totals

          if (
            rowText.includes('total')
          ) {
            return;
          }

          // =========================
          // ROUND OFF CHECK
          // =========================

          const actualValue =
            row[actualIndex];

          const billedValue =
            row[billedIndex];

          // Skip blanks

          if (
            actualValue === '' &&
            billedValue === ''
          ) {
            return;
          }

          // Skip headers

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

          // Skip invalid rows

          if (
            isNaN(actual) ||
            isNaN(billed)
          ) {
            return;
          }

          const expected =
            calculateBilling(
              actual
            );

          // Compare

          if (
            expected !== billed
          ) {

            mismatches.push({
              row:
                index + 1,
              type:
                currentSection,
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

          const flightNumberDisplay =
            row[flightIndex];

          const bayDisplay =
            row[bayIndex];

          if (
            origin === 'DEL' ||
            destination === 'DEL'
          ) {

            delRows.push({
              row:
                index + 1,
              type:
                currentSection,
              origin,
              destination,
              flight:
                flightNumberDisplay,
              bay:
                bayDisplay,
            });

          }

          // =========================
          // ABNORMAL USAGE CHECK
          // =========================

          const abnormalLimitMinutes =
            (
              Number(
                abnormalHours || 0
              ) * 60
            ) +
            Number(
              abnormalMinutes || 0
            );

          if (
            actual >
            abnormalLimitMinutes
          ) {

            abnormalUsageRows.push({
              row:
                index + 1,
              type:
                currentSection,
              actual,
            });

          }

          // =========================
          // CHARGES CHECK
          // =========================

          const billedMinutes =
            billed;

          const excelCharge =
            Number(
              row[chargesIndex]
            );

          if (
            !isNaN(excelCharge)
          ) {

            let hourlyRate = 0;

            if (
              currentSection === 'GPU'
            ) {

              hourlyRate =
                Number(gpuRate);

            } else if (
              currentSection === 'PCA'
            ) {

              hourlyRate =
                Number(pcaRate);

            }

            if (
              hourlyRate > 0
            ) {

              // Per minute rate

              const perMinuteRate =
                hourlyRate / 60;

              // Raw charge

              const rawCharge =
                billedMinutes *
                perMinuteRate;

              // Rounded charge

              const calculatedCharge =
                roundCharge(
                  rawCharge
                );

              // Compare

              if (
                calculatedCharge !==
                excelCharge
              ) {

                chargeErrors.push({
                  row:
                    index + 1,
                  type:
                    currentSection,
                  excel:
                    excelCharge,
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
                  rows: [
                    index + 1
                  ],
                  type:
                    rowType,
                  flightNumber,
                  regn,
                  bayNumber,
                }
              );

            }

          }

        }
      );

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

      // =========================
      // SAVE RESULTS
      // =========================

      setResults(
        mismatches
      );

      setDuplicates(
        duplicateFlights
      );

      setChargeErrors(
        chargeErrors
      );

      setAbnormalEntries(
        abnormalUsageRows
      );

      setDelEntries(
        delRows
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
        backgroundColor:
          '#000000',
        minHeight: '100vh',
        color: 'white',
      }}
    >

      {/* MAIN HEADING */}

      <h1
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '42px',
          color: 'white',
        }}
      >
        BME Excel Checker
      </h1>

      {/* RATE INPUTS */}

      <div
        style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >

        {/* GPU RATE */}

        <div
          style={{
            textAlign: 'center',
          }}
        >

          <label>
            GPU Rate/Hour
          </label>

          <br />

          <input
            type="number"
            value={gpuRate}
            onChange={(e) =>
              setGpuRate(
                e.target.value
              )
            }
          />

        </div>

        {/* PCA RATE */}

        <div
          style={{
            textAlign: 'center',
          }}
        >

          <label>
            PCA Rate/Hour
          </label>

          <br />

          <input
            type="number"
            value={pcaRate}
            onChange={(e) =>
              setPcaRate(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* MINIMUM ABNORMAL USAGE */}

      <div
        style={{
          marginBottom: '30px',
        }}
      >

        <h3
          style={{
            color: 'white',
            marginBottom: '15px',
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

          <div>

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

          </div>

          <div>

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

      </div>

      {/* FILE UPLOAD */}

      <div
        style={{
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleUpload}
          style={{
            color: 'white',
          }}
        />

      </div>

      {/* ROUND OFF CHECKER */}

      <h2
        style={{
          marginBottom: '15px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Round Off Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          backgroundColor: '#111111',
          borderCollapse: 'collapse',
          marginBottom: '50px',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
          }}
        >

          <tr>
            <th>Row</th>
            <th>Type</th>
            <th>Actual</th>
            <th>Billed</th>
            <th>Expected</th>
          </tr>

        </thead>

        <tbody>

          {results.length > 0 ? (

            results.map((item, index) => (

              <tr key={index}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.actual}</td>
                <td>{item.billed}</td>
                <td>{item.expected}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: 'center',
                }}
              >
                No rounding mismatches found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* REPITITION CHECKER */}

      <h2
        style={{
          marginBottom: '15px',
          color: 'white',
          textAlign: 'center',
          lineHeight: '1.6',
        }}
      >
        Repitition Checker

        <br />

        <span
          style={{
            fontSize: '18px',
            fontWeight: 'normal',
            display: 'block',
            marginTop: '8px',
          }}
        >
          (Only entries with same
          End Date,
          Flight Number,
          REGN,
          Bay Number,
          Start Time
          and End Time
          will be highlighted)
        </span>

      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          backgroundColor: '#111111',
          borderCollapse: 'collapse',
          marginBottom: '50px',
          color: 'white',
        }}
      >

        <thead
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
          }}
        >

          <tr>

            <th>Rows</th>
            <th>Type</th>
            <th>Flight</th>
            <th>REGN</th>
            <th>Bay</th>

          </tr>

        </thead>

        <tbody>

          {duplicates.length > 0 ? (

            duplicates.map((item, index) => (

              <tr key={index}>

                <td>{item.rows}</td>
                <td>{item.type}</td>
                <td>{item.flightNumber}</td>
                <td>{item.regn}</td>
                <td>{item.bayNumber}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: 'center',
                }}
              >
                No duplicate entries found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* CHARGES CHECKER */}

      <h2
        style={{
          marginTop: '50px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Charges Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          backgroundColor: '#111111',
          borderCollapse: 'collapse',
          color: 'white',
          marginBottom: '50px',
        }}
      >

        <thead
          style={{
            backgroundColor: '#16a34a',
            color: 'white',
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

            chargeErrors.map((item, index) => (

              <tr key={index}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.excel}</td>
                <td>{item.calculated}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="4"
                style={{
                  textAlign: 'center',
                }}
              >
                No charge mismatches found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* ABNORMAL USAGE CHECKER */}

      <h2
        style={{
          marginTop: '50px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Abnormal Usage Checker
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          backgroundColor: '#111111',
          borderCollapse: 'collapse',
          color: 'white',
          marginBottom: '50px',
        }}
      >

        <thead
          style={{
            backgroundColor: '#9333ea',
            color: 'white',
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

            abnormalEntries.map((item, index) => (

              <tr key={index}>

                <td>{item.row}</td>
                <td>{item.type}</td>
                <td>{item.actual}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="3"
                style={{
                  textAlign: 'center',
                }}
              >
                No abnormal usage found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* DEL CHECKER */}

      <h2
        style={{
          marginTop: '50px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        DEL Flight Checker(Flights with Origin or Destination "DEL" will be listed)
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: '100%',
          backgroundColor: '#111111',
          borderCollapse: 'collapse',
          color: 'white',
          marginBottom: '50px',
        }}
      >

        <thead
          style={{
            backgroundColor: '#ea580c',
            color: 'white',
          }}
        >

          <tr>

            <th>Row</th>
            <th>Type</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Flight Number</th>
            <th>Bay Number</th>

          </tr>

        </thead>

        <tbody>

          {delEntries.length > 0 ? (

            delEntries.map((item, index) => (

              <tr key={index}>

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

              <td
                colSpan="6"
                style={{
                  textAlign: 'center',
                }}
              >
                No DEL flights found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}