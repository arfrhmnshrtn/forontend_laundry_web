import * as XLSX from "xlsx";

export const useExportReport = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateForHeader = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const exportReport = (transactions, dateFrom, dateTo) => {
    if (!transactions || transactions.length === 0) {
      alert(
        "Tidak ada data untuk diekspor. Silakan pilih rentang tanggal yang valid."
      );
      return;
    }

    // =============================
    // 🔥 FILTER HANYA STATUS SELESAI
    // =============================
    let filteredTransactions = transactions.filter(
      (trx) => trx.status === "selesai"
    );

    // Filter berdasarkan tanggal masuk
    if (dateFrom) {
      filteredTransactions = filteredTransactions.filter(
        (trx) => trx.dateIn >= dateFrom
      );
    }

    if (dateTo) {
      filteredTransactions = filteredTransactions.filter(
        (trx) => trx.dateIn <= dateTo
      );
    }

    if (filteredTransactions.length === 0) {
      alert(
        "Tidak ada data transaksi SELESAI dalam rentang tanggal yang dipilih."
      );
      return;
    }

    // =============================
    // 🔥 DATA EXPORT
    // =============================
    const exportData = filteredTransactions.map((trx, index) => {
      return {
        NO: index + 1,
        TANGGAL_MASUK: formatDate(trx.dateIn),
        TANGGAL_SELESAI: trx.dateOut ? formatDate(trx.dateOut) : "-",
        NO_TRANSAKSI: `TRX-${String(trx.id).padStart(6, "0")}`,
        NAMA_PELANGGAN: trx.customerName || "-",
        NO_TELEPON: trx.customerPhone || "-",
        LAYANAN: trx.services || "-",
        BERAT_KG: trx.berat ? trx.berat.toFixed(2) : "0.00",
        TOTAL_HARGA: trx.totalPrice || 0,
        STATUS: trx.status || "-",
      };
    });

    const wb = XLSX.utils.book_new();

    // =============================
    // 🔥 HEADER / TITLE
    // =============================
    const title = "LAPORAN TRANSAKSI LAUNDRY";
    const companyName = "NAYLA LAUNDRY";
    const dateRange = `Periode: ${formatDateForHeader(
      dateFrom
    )} - ${formatDateForHeader(dateTo)}`;
    const totalTransactions = `Total Transaksi: ${filteredTransactions.length}`;
    const exportDate = `Tanggal Ekspor: ${new Date().toLocaleDateString(
      "id-ID",
      { day: "2-digit", month: "2-digit", year: "numeric" }
    )} ${new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const headerData = [
      [companyName],
      [title],
      [dateRange],
      [totalTransactions, "", "", "", "", "", "", exportDate],
      [],
      Object.keys(exportData[0]),
    ];

    const allData = headerData.concat(
      exportData.map((row) => Object.values(row))
    );

    const ws = XLSX.utils.aoa_to_sheet(allData);

    // =============================
    // 🔥 MERGE HEADER ROWS
    // =============================
    if (!ws["!merges"]) ws["!merges"] = [];

    ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } });
    ws["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 9 } });
    ws["!merges"].push({ s: { r: 2, c: 0 }, e: { r: 2, c: 9 } });
    ws["!merges"].push({ s: { r: 3, c: 7 }, e: { r: 3, c: 9 } });

    // =============================
    // 🔥 STYLING HEADER
    // =============================
    ws["A1"].s = {
      font: { bold: true, sz: 14, color: { rgb: "2C3E50" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "ECF0F1" } },
    };

    ws["A2"].s = {
      font: { bold: true, sz: 18, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "3498DB" } },
    };

    ws["A3"].s = {
      font: { bold: true, sz: 12, color: { rgb: "2C3E50" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "E8F4FD" } },
    };

    ws["A4"].s = {
      font: { bold: true, sz: 10, color: { rgb: "2C3E50" } },
      fill: { fgColor: { rgb: "E8F4FD" } },
    };

    ws["G4"].s = {
      font: { bold: true, sz: 10, color: { rgb: "2C3E50" } },
      alignment: { horizontal: "right" },
      fill: { fgColor: { rgb: "E8F4FD" } },
    };

    // =============================
    // 🔥 HEADER TABLE STYLE
    // =============================
    const headerRow = 5;
    const headerCells = Object.keys(exportData[0]);

    headerCells.forEach((key, idx) => {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: idx });
      if (!ws[cellAddress]) ws[cellAddress] = { t: "s", v: key };

      ws[cellAddress].s = {
        font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
        fill: { fgColor: { rgb: "2980B9" } },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "medium", color: { rgb: "1A5490" } },
          bottom: { style: "medium", color: { rgb: "1A5490" } },
          left: { style: "medium", color: { rgb: "1A5490" } },
          right: { style: "medium", color: { rgb: "1A5490" } },
        },
      };
    });

    // =============================
    // 🔥 ROW DATA STYLE
    // =============================
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = headerRow + 1; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;

        const fillColor = R % 2 === 0 ? { rgb: "FFFFFF" } : { rgb: "F8F9FA" };

        ws[cellAddress].s = {
          border: {
            top: { style: "thin", color: { rgb: "BDC3C7" } },
            bottom: { style: "thin", color: { rgb: "BDC3C7" } },
            left: { style: "thin", color: { rgb: "BDC3C7" } },
            right: { style: "thin", color: { rgb: "BDC3C7" } },
          },
          alignment: {
            horizontal:
              C === 0 ? "center" : C === 8 || C === 9 ? "right" : "left",
            vertical: "center",
            wrapText: true,
          },
          fill: { fgColor: fillColor },
          font: { sz: 10, color: { rgb: "2C3E50" } },
        };

        if (C === 8) ws[cellAddress].z = '#,##0.00 "Kg"';
        else if (C === 9) ws[cellAddress].z = '"Rp" #,##0';
      }
    }

    // =============================
    // 🔥 COLUMN WIDTH
    // =============================
    ws["!cols"] = [
      { wch: 8 },
      { wch: 15 },
      { wch: 15 },
      { wch: 18 },
      { wch: 25 },
      { wch: 18 },
      { wch: 30 },
      { wch: 12 },
      { wch: 15 },
      { wch: 18 },
    ];

    // =============================
    // 🔥 PAGE SETUP PRINT
    // =============================
    ws["!pageSetup"] = {
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
      margins: {
        left: 0.5,
        right: 0.5,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3,
      },
      scale: 90,
    };

    ws["!printTitleRows"] = "1:6";
    ws["!freeze"] = { xSplit: 0, ySplit: 6 };

    XLSX.utils.book_append_sheet(wb, ws, "Laporan Transaksi");

    const filename = `LAPORAN_TRANSAKSI_LAUNDRY_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return {
    exportReport,
  };
};
