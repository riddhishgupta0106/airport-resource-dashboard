import html2canvas from "html2canvas";

function DownloadChartButton({ targetId, fileName }) {

  const downloadChart = async () => {

    const element =
      document.getElementById(targetId);

    if (!element) return;

    const canvas =
      await html2canvas(element);

    const link =
      document.createElement("a");

    link.download =
      `${fileName}.png`;

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <button
      onClick={downloadChart}
      style={{
        float: "right",
        marginBottom: "10px",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer"
      }}
    >
      📥 PNG
    </button>
  );
}

export default DownloadChartButton;