function AirlineAnalysis({ airlineData }) {
  if (!airlineData)
    return null;

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          color: "#111827",
          fontWeight: 700,
          fontSize: "1.6rem",
          marginBottom: "24px",
          marginTop: "0",
        }}
      >
        Airline Wise Analysis
      </h2>

      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
              }}
            >
              <th style={headerStyle}>Airline</th>
              <th style={headerStyle}>Flights</th>
              <th style={headerStyle}>GPU Hours</th>
              <th style={headerStyle}>PCA Hours</th>
              <th style={headerStyle}>Domestic</th>
              <th style={headerStyle}>International</th>
              <th style={headerStyle}>Longhaul</th>
              <th style={headerStyle}>Turnaround</th>
            </tr>
          </thead>

          <tbody>
            {airlineData.map((airline) => (
              <tr key={airline.airline}>
                <td style={cellStyle}>
                  {airline.airline}
                </td>

                <td style={cellStyle}>
                  {airline.flights}
                </td>

                <td style={cellStyle}>
                  {(airline.gpuHours || 0).toFixed(2)}
                </td>

                <td style={cellStyle}>
                  {(airline.pcaHours || 0).toFixed(2)}
                </td>

                <td style={cellStyle}>
                  {airline.domestic}
                </td>

                <td style={cellStyle}>
                  {airline.international}
                </td>

                <td style={cellStyle}>
                  {airline.longhaul}
                </td>

                <td style={cellStyle}>
                  {airline.turnaround}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const headerStyle = {
  padding: "12px",
  border: "1px solid #e5e7eb",
  fontWeight: 700,
  color: "#111827",
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #e5e7eb",
};

export default AirlineAnalysis;