function DateAnalysis({ dateData }) {
  if (!dateData)
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
        Date Wise Analysis
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
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Total Flights</th>
              <th style={headerStyle}>Domestic</th>
              <th style={headerStyle}>International</th>
            </tr>
          </thead>

          <tbody>
            {dateData.map((day) => (
              <tr key={day.date}>
                <td style={cellStyle}>
                  {day.date}
                </td>

                <td style={cellStyle}>
                  {day.flights}
                </td>

                <td style={cellStyle}>
                  {day.domestic}
                </td>

                <td style={cellStyle}>
                  {day.international}
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

export default DateAnalysis;