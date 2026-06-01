function DateAnalysis({ dateData }) {

    if (!dateData)
      return null;
  
    return (
  
      <div>
  
        <h2>
          Date Wise Analysis
        </h2>
  
        <table
          border="1"
          cellPadding="8"
        >
  
          <thead>
  
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Domestic</th>
              <th>International</th>
            </tr>
  
          </thead>
  
          <tbody>
  
            {dateData.map((day) => (
  
              <tr key={day.date}>
  
                <td>{day.date}</td>
  
                <td>{day.flights}</td>
  
                <td>{day.domestic}</td>
  
                <td>{day.international}</td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
  
    );
  }
  
  export default DateAnalysis;