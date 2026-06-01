import * as XLSX from "xlsx";

function UploadSection({ setRows }) {
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(
        event.target.result,
        { type: "binary" }
      );

      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];

      const data =
        XLSX.utils.sheet_to_json(sheet);

      setRows(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>Upload Airport Excel File</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />
    </div>
  );
}

export default UploadSection;