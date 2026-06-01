function AircraftResourceTable({
    aircraftResourceData
  }) {
  
    if (!aircraftResourceData)
      return null;
  
    return (
  
      <div>
  
        <h2>
          Aircraft Resource Analysis
        </h2>
  
        <table
          border="1"
          cellPadding="8"
        >
  
          <thead>
  
            <tr>
  
              <th>
                Aircraft Type
              </th>
  
              <th>
                Flights
              </th>
  
              <th>
                Domestic GPU
              </th>
  
              <th>
                International GPU
              </th>
  
              <th>
                Domestic PCA
              </th>
  
              <th>
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
  
                  <td>
                    {item.type}
                  </td>
  
                  <td>
                    {item.flights}
                  </td>
  
                  <td>
                    {item.domesticGPUHours.toFixed(1)}
                  </td>
  
                  <td>
                    {item.internationalGPUHours.toFixed(1)}
                  </td>
  
                  <td>
                    {item.domesticPCAHours.toFixed(1)}
                  </td>
  
                  <td>
                    {item.internationalPCAHours.toFixed(1)}
                  </td>
  
                </tr>
  
              )
            )}
  
          </tbody>
  
        </table>
  
      </div>
  
    );
  
  }
  
  export default AircraftResourceTable;