function AircraftResourceTable({
  aircraftResourceData,
}) {
  if (!aircraftResourceData)
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
        Aircraft Resource Analysis
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
              <th style={headerStyle}>
                Aircraft Type
              </th>

              <th style={headerStyle}>
                Flights
              </th>

              <th style={headerStyle}>
                Domestic GPU
              </th>

              <th style={headerStyle}>
                International GPU
              </th>

              <th style={headerStyle}>
                Domestic PCA
              </th>

              <th style={headerStyle}>
                International PCA
              </th>
            </tr>
          </thead>

          <tbody>
            {aircraftResourceData.map(
              (item) => (
                <tr
                  key={item.type}
                >
                  <td style={cellStyle}>
                    {item.type}
                  </td>

                  <td style={cellStyle}>
                    {item.flights}
                  </td>

                  <td style={cellStyle}>
                    {item.domesticGPUHours.toFixed(
                      2
                    )}
                  </td>

                  <td style={cellStyle}>
                    {item.internationalGPUHours.toFixed(
                      2
                    )}
                  </td>

                  <td style={cellStyle}>
                    {item.domesticPCAHours.toFixed(
                      2
                    )}
                  </td>

                  <td style={cellStyle}>
                    {item.internationalPCAHours.toFixed(
                      2
                    )}
                  </td>
                </tr>
              )
            )}
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

export default AircraftResourceTable;