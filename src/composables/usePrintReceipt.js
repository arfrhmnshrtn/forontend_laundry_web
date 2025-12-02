export const usePrintReceipt = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const printReceipt = (transaction) => {
    if (!transaction) return;

    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Struk Transaksi Laundry</title>
        <style>
          @page {
            size: 80mm auto;
            margin: 5mm;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Courier New', monospace;
          }
          
          body {
            width: 72mm;
            padding: 2mm;
            background: white;
            color: #333;
            font-size: 11px;
            line-height: 1.2;
          }
          
          .header {
            text-align: center;
            margin-bottom: 8px;
            border-bottom: 1px dashed #333;
            padding-bottom: 8px;
          }
          
          .company-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          
          .company-address {
            font-size: 9px;
            margin-bottom: 2px;
          }
          
          .company-phone {
            font-size: 9px;
          }
          
          .receipt-title {
            text-align: center;
            font-weight: bold;
            margin: 8px 0;
            font-size: 12px;
          }
          
          .transaction-info {
            margin-bottom: 8px;
          }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          
          .customer-info {
            margin-bottom: 8px;
            border-bottom: 1px dashed #333;
            padding-bottom: 8px;
          }
          
          .items-title {
            font-weight: bold;
            margin-bottom: 4px;
          }
          
          .item-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          
          .item-name {
            flex: 1;
          }
          
          .item-qty {
            text-align: right;
            margin-right: 8px;
            min-width: 30px;
          }
          
          .item-price {
            text-align: right;
            min-width: 50px;
          }
          
          .summary {
            margin-top: 8px;
            border-top: 1px dashed #333;
            padding-top: 8px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 2px;
          }
          
          .payment-info {
            margin-top: 8px;
            border-bottom: 1px dashed #333;
            padding-bottom: 8px;
          }
          
          .notes {
            margin-top: 8px;
            font-size: 9px;
            font-style: italic;
            text-align: center;
          }
          
          .footer {
            text-align: center;
            margin-top: 8px;
            font-size: 9px;
          }
          
          .status-badge {
            display: inline-block;
            padding: 1px 4px;
            border-radius: 2px;
            font-size: 8px;
            font-weight: bold;
          }
          
          .status-pending {
            background-color: #fbbf24;
            color: #78350f;
          }
          
          .status-process {
            background-color: #60a5fa;
            color: #1e3a8a;
          }
          
          .status-selesai {
            background-color: #34d399;
            color: #064e3b;
          }
          
          .payment-lunas {
            color: #059669;
            font-weight: bold;
          }
          
          .payment-belum {
            color: #dc2626;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">NAYLA LAUNDRY</div>
          <div class="company-address">Jl. Pagar Alam No.146, Segala Mider, Kec. Tj. Karang Bar., Kota Bandar Lampung.</div>
          <div class="company-phone">Telp: 0812-3456-789</div>
        </div>
        
        <div class="receipt-title">STRUK TRANSAKSI</div>
        
        <div class="transaction-info">
          <div class="info-row">
            <span>No. Transaksi:</span>
            <span>#${String(transaction.id).padStart(6, "0")}</span>
          </div>
          <div class="info-row">
            <span>Tanggal:</span>
            <span>${formatDate(transaction.dateIn)}</span>
          </div>
        </div>
        
        <div class="customer-info">
          <div class="info-row">
            <span>Pelanggan:</span>
            <span>${
              transaction.customerName || transaction.nama_pelanggan
            }</span>
          </div>
          <div class="info-row">
            <span>Telepon:</span>
            <span>${transaction.customerPhone || transaction.no_telepon}</span>
          </div>
        </div>
        
        <div class="items-title">RINCIAN LAYANAN:</div>
        <div class="items-list">
          ${generateServiceItems(transaction)}
        </div>
        
        <div class="summary">
          <div class="info-row">
            <span>Total Berat:</span>
            <span>${getTotalWeight(transaction)} kg</span>
          </div>
          <div class="total-row">
            <span>TOTAL BAYAR:</span>
            <span>${formatCurrency(
              transaction.totalPrice || transaction.total_harga
            )}</span>
          </div>
        </div>
        
        <div class="payment-info">
          <div class="info-row">
            <span>Pembayaran:</span>
            <span class="${
              transaction.paymentMethod === "Lunas" ||
              transaction.pembayaran_status === "Lunas"
                ? "payment-lunas"
                : "payment-belum"
            }">
              ${transaction.paymentMethod || transaction.pembayaran_status}
            </span>
          </div>
          ${
            transaction.dateOut || transaction.tanggal_selesai
              ? `
          <div class="info-row">
            <span>Selesai:</span>
            <span>${formatShortDate(
              transaction.dateOut || transaction.tanggal_selesai
            )}</span>
          </div>
          `
              : ""
          }
        </div>
        
        ${
          transaction.notes || transaction.catatan
            ? `
        <div class="notes">
          Catatan: ${transaction.notes || transaction.catatan}
        </div>
        `
            : ""
        }
        
        <div class="footer">
          <div>Terima kasih atas kepercayaan Anda</div>
          <div>${getCurrentDateTime()}</div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptContent);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const generateServiceItems = (transaction) => {
    const services = transaction.detailLayanan || transaction.details || [];

    if (services.length === 0) {
      return `
        <div class="item-row">
          <span class="item-name">${transaction.services || "Laundry"}</span>
          <span class="item-qty">${transaction.berat || 1} kg</span>
          <span class="item-price">${formatCurrency(
            transaction.totalPrice || transaction.total_harga
          )}</span>
        </div>
      `;
    }

    return services
      .map(
        (service) => `
      <div class="item-row">
        <span class="item-name">${
          service.namaLayanan || service.nama_layanan
        }</span>
        <span class="item-qty">${service.berat} ${
          service.satuan_harga || "kg"
        }</span>
        <span class="item-price">${formatCurrency(
          service.subtotal || service.harga
        )}</span>
      </div>
    `
      )
      .join("");
  };

  const getTotalWeight = (transaction) => {
    const services = transaction.detailLayanan || transaction.details || [];
    if (services.length === 0) {
      return transaction.berat || 0;
    }
    return services.reduce(
      (total, service) => total + parseFloat(service.berat || 0),
      0
    );
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: "ANTRIAN",
      process: "PROSES",
      selesai: "SELESAI",
      done: "SELESAI",
      delivered: "DIAMBIL",
    };
    return statusMap[status] || status.toUpperCase();
  };

  return {
    printReceipt,
  };
};
