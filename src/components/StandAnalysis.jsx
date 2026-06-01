function StandAnalysis({ standData }) {

  if (!standData)
    return null;

  return (

    <div>

      <h2>
        Stand Wise Analysis
      </h2>

      <table
        border="1"
        cellPadding="8"
      >

        <thead>

          <tr>
            <th>Stand</th>
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

          {standData.map((stand) => (

            <tr
              key={stand.stand}
            >

              <td>
                {stand.stand}
              </td>

              <td>
                {stand.flights}
              </td>

              <td>
                {(stand.gpuHours || 0).toFixed(1)}
              </td>

              <td>
                {(stand.pcaHours || 0).toFixed(1)}
              </td>

              <td>
                {stand.domestic}
              </td>

              <td>
                {stand.international}
              </td>

              <td>
                {stand.longhaul}
              </td>

              <td>
                {stand.turnaround}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default StandAnalysis;