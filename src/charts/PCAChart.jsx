import html2canvas from "html2canvas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PCAChart({ airlineData }) {

  if (!airlineData)
    return null;

  const sortedData = [...airlineData].sort(
    (a, b) =>
      (
        (b.domesticPCAHours || 0) +
        (b.internationalPCAHours || 0)
      ) -
      (
        (a.domesticPCAHours || 0) +
        (a.internationalPCAHours || 0)
      )
  );

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "pca-airline-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "PCA_Utilization_By_Airline.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <div
      id="pca-airline-chart"
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
          PCA Utilization By Airline
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

      <ResponsiveContainer
        width="100%"
        height={Math.max(
          600,
          sortedData.length * 35
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
            type="category"
            dataKey="airline"
            width={220}
            interval={0}
            tick={{
              fontSize: 13
            }}
          />

          <Tooltip
            formatter={(value) =>
              Number(value).toFixed(2)
            }
          />

          <Legend />

          <Bar
            dataKey="domesticPCAHours"
            name="Domestic PCA"
            fill="#1976d2"
          />

          <Bar
            dataKey="internationalPCAHours"
            name="International PCA"
            fill="#ff9800"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PCAChart;