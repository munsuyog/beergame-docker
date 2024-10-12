import React from "react";
import { FaFileExcel } from "react-icons/fa";

const DownloadExcelButton = ({ sessionId }) => {
  const API_BASE_URL = 'http://125.20.54.14:5555';

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/generate_session_excel/${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `session_${sessionId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <FaFileExcel className="mr-2" />
      Download Session Data (Excel)
    </button>
  );
};

export default DownloadExcelButton;
