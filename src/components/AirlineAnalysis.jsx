function AirlineAnalysis({ airlineData }) {

  if (!airlineData)
    return null;

  return (

    <div>

      <h2>Airline Wise Analysis</h2>

      <table
        border="1"
        cellPadding="8"
      >

        <thead>

          <tr>
            <th>Airline</th>
            <th>Flights</th>
            <th>GPU Hours</th>
            <th>PCA Hours</th>
            <th>Domestic</th>
            <th>International</th>
            <th>Longhaul</th>
            <th>Turnaround</th>
          </tr>

        </thead>

        <tbody>

          {airlineData.map((airline) => (

            <tr key={airline.airline}>

              <td>{airline.airline}</td>

              <td>{airline.flights}</td>

              <td>
                {(airline.gpuHours || 0).toFixed(1)}
              </td>

              <td>
                {(airline.pcaHours || 0).toFixed(1)}
              </td>

              <td>{airline.domestic}</td>

              <td>{airline.international}</td>

              <td>{airline.longhaul}</td>

              <td>{airline.turnaround}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default AirlineAnalysis;