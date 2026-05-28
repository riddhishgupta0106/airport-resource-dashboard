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

  const [gpuRate, setGpuRate] = useState('');
  const [pcaRate, setPcaRate] = useState('');

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

      // =========================
      // MAPS
      // =========================

      const gpuFlightSet = new Map();
      const pcaFlightSet = new Map();

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

            hourlyRate =
              Number(gpuRate);

          } else if (
            currentSection === 'PCA'
          ) {

            hourlyRate =
              Number(pcaRate);

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

      {/* RATES */}

      <div
        style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >

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
            <th>Actual</th>
            <th>Billed</th>
            <th>Expected</th>
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

      {/* DUPLICATE CHECKER */}

      <h2
        style={{
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        Repitition Checker
      </h2>

      <p
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        (End Date, Flight Number,
        REGN, Bay Number,
        Start Time, End Time)
      </p>

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
            backgroundColor: '#dc2626',
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

            duplicates.map((item, idx) => (

              <tr key={idx}>

                <td>{item.rows}</td>
                <td>{item.type}</td>
                <td>{item.flightNumber}</td>
                <td>{item.regn}</td>
                <td>{item.bayNumber}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="5">
                No duplicate entries found
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

    </div>

  );

}