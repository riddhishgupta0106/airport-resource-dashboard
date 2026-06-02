import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  
  import { Paper } from "@mui/material";
  
  function AirlineUtilizationGrid({
    airlineData
  }) {
    if (!airlineData)
      return null;
  
    const sortedAirlines = [...airlineData].sort(
      (a, b) => b.flights - a.flights
    );
  
    return (
      <div>
  
        <h2
          style={{
            textAlign: "center",
            color: "#111827",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "32px"
          }}
        >
          GPU & PCA Utilization %
        </h2>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "24px"
          }}
        >
  
          {sortedAirlines.map((airline) => {
  
            const gpuUsage =
              (
                airline.gpuFlights /
                airline.flights
              ) * 100;
  
            const pcaUsage =
              (
                airline.pcaFlights /
                airline.flights
              ) * 100;
  
            return (
  
              <Paper
                key={airline.airline}
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4
                }}
              >
  
                <h3
                  style={{
                    textAlign: "center",
                    color: "#111827",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    marginBottom: "25px"
                  }}
                >
                  {airline.airline}
                </h3>
  
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px"
                  }}
                >
  
                  {/* GPU */}
  
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center"
                    }}
                  >
  
                    <h4
                      style={{
                        marginBottom: "10px",
                        fontSize: "1.1rem"
                      }}
                    >
                      GPU
                    </h4>
  
                    <ResponsiveContainer
                      width="100%"
                      height={220}
                    >
  
                      <PieChart>
  
                        <Pie
                          data={[
                            {
                              name: "Used",
                              value: gpuUsage
                            },
                            {
                              name: "Unused",
                              value:
                                100 - gpuUsage
                            }
                          ]}
                          dataKey="value"
                          innerRadius={50}
                          outerRadius={80}
                        >
  
                          <Cell fill="#22c55e" />
                          <Cell fill="#ef4444" />
  
                        </Pie>
  
                        <Tooltip
                          formatter={(value) =>
                            `${Number(value).toFixed(2)}%`
                          }
                        />
  
                      </PieChart>
  
                    </ResponsiveContainer>
  
                    <div
                      style={{
                        color: "#22c55e",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        marginTop: "-15px"
                      }}
                    >
                      {gpuUsage.toFixed(2)}%
                    </div>
  
                  </div>
  
                  {/* PCA */}
  
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center"
                    }}
                  >
  
                    <h4
                      style={{
                        marginBottom: "10px",
                        fontSize: "1.1rem"
                      }}
                    >
                      PCA
                    </h4>
  
                    <ResponsiveContainer
                      width="100%"
                      height={220}
                    >
  
                      <PieChart>
  
                        <Pie
                          data={[
                            {
                              name: "Used",
                              value: pcaUsage
                            },
                            {
                              name: "Unused",
                              value:
                                100 - pcaUsage
                            }
                          ]}
                          dataKey="value"
                          innerRadius={50}
                          outerRadius={80}
                        >
  
                          <Cell fill="#22c55e" />
                          <Cell fill="#ef4444" />
  
                        </Pie>
  
                        <Tooltip
                          formatter={(value) =>
                            `${Number(value).toFixed(2)}%`
                          }
                        />
  
                      </PieChart>
  
                    </ResponsiveContainer>
  
                    <div
                      style={{
                        color: "#22c55e",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        marginTop: "-15px"
                      }}
                    >
                      {pcaUsage.toFixed(2)}%
                    </div>
  
                  </div>
  
                </div>
  
              </Paper>
  
            );
  
          })}
  
        </div>
  
      </div>
    );
  
  }
  
  export default AirlineUtilizationGrid;