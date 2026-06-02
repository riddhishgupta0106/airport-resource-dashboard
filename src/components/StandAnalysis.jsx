function StandAnalysis({ standData }) {
  if (!standData)
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
        Stand Wise Analysis
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
              <th style={headerStyle}>Stand</th>
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
            {standData.map((stand) => (
              <tr key={stand.stand}>
                <td style={cellStyle}>
                  {stand.stand}
                </td>

                <td style={cellStyle}>
                  {stand.flights}
                </td>

                <td style={cellStyle}>
                  {(stand.gpuHours || 0).toFixed(2)}
                </td>

                <td style={cellStyle}>
                  {(stand.pcaHours || 0).toFixed(2)}
                </td>

                <td style={cellStyle}>
                  {stand.domestic}
                </td>

                <td style={cellStyle}>
                  {stand.international}
                </td>

                <td style={cellStyle}>
                  {stand.longhaul}
                </td>

                <td style={cellStyle}>
                  {stand.turnaround}
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

export default StandAnalysis;