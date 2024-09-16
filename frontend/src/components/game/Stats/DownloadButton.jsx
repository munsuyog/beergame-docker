import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { FaFileExcel } from 'react-icons/fa';

const DownloadExcelButton = ({ gameStatus }) => {
  const handleDownload = () => {
    if (!gameStatus) return;

    // Prepare individual performance data
    const individualPerformanceData = [
      ["Role", "Cost", "% Shipped on Time", "Average Stock", "Average Backorder", "Average Orders"],
      ["Retailer", gameStatus.data.cost_total_sum.Retailer, (gameStatus.data.fulfilment_avg.Retailer * 100).toFixed(1), gameStatus.data.inventory.Retailer.reduce((a, b) => a + b, 0) / gameStatus.data.inventory.Retailer.length, gameStatus.data.backorder.Retailer.reduce((a, b) => a + b, 0) / gameStatus.data.backorder.Retailer.length, gameStatus.data.orders.Retailer.reduce((a, b) => a + b, 0) / gameStatus.data.orders.Retailer.length],
      ["Wholesaler", gameStatus.data.cost_total_sum.Wholesaler, (gameStatus.data.fulfilment_avg.Wholesaler * 100).toFixed(1), gameStatus.data.inventory.Wholesaler.reduce((a, b) => a + b, 0) / gameStatus.data.inventory.Wholesaler.length, gameStatus.data.backorder.Wholesaler.reduce((a, b) => a + b, 0) / gameStatus.data.backorder.Wholesaler.length, gameStatus.data.orders.Wholesaler.reduce((a, b) => a + b, 0) / gameStatus.data.orders.Wholesaler.length],
      ["Distributor", gameStatus.data.cost_total_sum.Distributor, (gameStatus.data.fulfilment_avg.Distributor * 100).toFixed(1), gameStatus.data.inventory.Distributor.reduce((a, b) => a + b, 0) / gameStatus.data.inventory.Distributor.length, gameStatus.data.backorder.Distributor.reduce((a, b) => a + b, 0) / gameStatus.data.backorder.Distributor.length, gameStatus.data.orders.Distributor.reduce((a, b) => a + b, 0) / gameStatus.data.orders.Distributor.length],
      ["Manufacturer", gameStatus.data.cost_total_sum.Manufacturer, (gameStatus.data.fulfilment_avg.Manufacturer * 100).toFixed(1), gameStatus.data.inventory.Manufacturer.reduce((a, b) => a + b, 0) / gameStatus.data.inventory.Manufacturer.length, gameStatus.data.backorder.Manufacturer.reduce((a, b) => a + b, 0) / gameStatus.data.backorder.Manufacturer.length, gameStatus.data.orders.Manufacturer.reduce((a, b) => a + b, 0) / gameStatus.data.orders.Manufacturer.length],
    ];

    // Prepare cost data sheet
    const costData = [];
    const weekCount = gameStatus.data.orders.Retailer.length;

    for (let i = 0; i < weekCount; i++) {
      costData.push({
        Week: i + 1,
        "Retailer": gameStatus.data.cost.Retailer[i],
        "Wholesaler": gameStatus.data.cost.Wholesaler[i],
        "Distributor": gameStatus.data.cost.Distributor[i],
        "Manufacturer": gameStatus.data.cost.Manufacturer[i],
      });
    }

    // Prepare shipments/deliveries data sheet
    const shipmentsData = [];

    for (let i = 0; i < weekCount; i++) {
      shipmentsData.push({
        Week: i + 1,
        "Retailer": gameStatus.data.shipments.Retailer[i],
        "Wholesaler": gameStatus.data.shipments.Wholesaler[i],
        "Distributor": gameStatus.data.shipments.Distributor[i],
        "Manufacturer": gameStatus.data.shipments.Manufacturer[i],
      });
    }

    // Prepare backorder data sheet
    const backorderData = [];

    for (let i = 0; i < weekCount; i++) {
      backorderData.push({
        Week: i + 1,
        "Retailer": gameStatus.data.backorder.Retailer[i],
        "Wholesaler": gameStatus.data.backorder.Wholesaler[i],
        "Distributor": gameStatus.data.backorder.Distributor[i],
        "Manufacturer": gameStatus.data.backorder.Manufacturer[i],
      });
    }

    // Prepare orders data sheet
    const ordersData = [];

    for (let i = 0; i < weekCount; i++) {
      ordersData.push({
        Week: i + 1,
        "Retailer": gameStatus.data.orders.Retailer[i],
        "Wholesaler": gameStatus.data.orders.Wholesaler[i],
        "Distributor": gameStatus.data.orders.Distributor[i],
        "Manufacturer": gameStatus.data.orders.Manufacturer[i],
        "Consumer": gameStatus.data.orders.Consumer[i],
      });
    }

    // Create workbook and sheets
    const wb = XLSX.utils.book_new();
    
    // Add individual performance sheet
    const individualWs = XLSX.utils.aoa_to_sheet(individualPerformanceData);
    XLSX.utils.book_append_sheet(wb, individualWs, "Individual Performance");
    
    // Add cost data sheet
    const costWs = XLSX.utils.json_to_sheet(costData);
    XLSX.utils.book_append_sheet(wb, costWs, "Costs");

    // Add shipments/deliveries data sheet
    const shipmentsWs = XLSX.utils.json_to_sheet(shipmentsData);
    XLSX.utils.book_append_sheet(wb, shipmentsWs, "Shipments");

    // Add backorder data sheet
    const backorderWs = XLSX.utils.json_to_sheet(backorderData);
    XLSX.utils.book_append_sheet(wb, backorderWs, "Backorders");

    // Add orders data sheet
    const ordersWs = XLSX.utils.json_to_sheet(ordersData);
    XLSX.utils.book_append_sheet(wb, ordersWs, "Orders");

    // Export to Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    saveAs(blob, "team_performance.xlsx");
  };

  // Helper function to convert string to ArrayBuffer
  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };

  return (
    <motion.button
      onClick={handleDownload}
      className={`inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={!gameStatus}
    >
      <FaFileExcel className="mr-2" />
      <span>Download Excel</span>
    </motion.button>
  );
};

export default DownloadExcelButton;
