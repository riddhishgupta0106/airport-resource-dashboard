import html2canvas from "html2canvas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

function AirlineChart({ airlineData }) {

  if (!airlineData)
    return null;

  const sortedData = [...airlineData].sort(
    (a, b) =>
      (b.domestic + b.international) -
      (a.domestic + a.international)
  );

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "airline-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "Flights_By_Airline.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <div
      id="airline-chart"
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom:
            "20px"
        }}
      >

        <h2
          style={{
            color: "#111827",
            fontWeight: 700,
            fontSize: "1.6rem",
            margin: 0
          }}
        >
          Flights by Airline
        </h2>

        <button
          onClick={
            downloadChart
          }
          style={{
            padding:
              "8px 14px",
            border:
              "none",
            borderRadius:
              "8px",
            background:
              "#2563eb",
            color:
              "white",
            cursor:
              "pointer",
            fontWeight:
              600
          }}
        >
          📥 PNG
        </button>

      </div>

      <div
        style={{
          width: "100%",
          overflowX: "auto"
        }}
      >

        <ResponsiveContainer
          width="100%"
          height={Math.max(
            600,
            sortedData.length *
              35
          )}
        >

          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 120,
              bottom: 20
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
            />

            <YAxis
              dataKey="airline"
              type="category"
              width={220}
              interval={0}
              tick={{
                fontSize: 13
              }}
            />

            <Tooltip
              formatter={(
                value
              ) =>
                Number(
                  value
                ).toFixed(0)
              }
            />

            <Legend />

            <Bar
              dataKey="domestic"
              name="Domestic"
              fill="#1976d2"
            />

            <Bar
              dataKey="international"
              name="International"
              fill="#ff9800"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AirlineChart;