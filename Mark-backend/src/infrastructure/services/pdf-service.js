const puppeteer = require('puppeteer');

class PdfService {
  async generateQuotationPdf(quotationData) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Basic HTML template for quotation
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
            .header { display: flex; justify-content: space-between; margin-bottom: 60px; }
            .logo { font-size: 24px; font-weight: 900; color: #1e3a8a; }
            .quot-info { text-align: right; }
            .quot-number { font-size: 32px; font-weight: 900; margin-bottom: 4px; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
            .table { w-full border-collapse: collapse; margin-bottom: 40px; }
            .table th { background: #f8fafc; padding: 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 2px solid #e2e8f0; }
            .table td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
            .totals { float: right; width: 300px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .grand-total { font-size: 18px; font-weight: 900; color: #1e3a8a; border-top: 2px solid #e2e8f0; margin-top: 12px; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div className="header">
            <div className="logo">MARK ISP</div>
            <div className="quot-info">
              <div className="quot-number">${quotationData.quot_number}</div>
              <div style="color: #64748b; font-weight: 600;">Tanggal: ${new Date(quotationData.created_at).toLocaleDateString('id-ID')}</div>
            </div>
          </div>

          <div className="details">
            <div>
              <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Kepada:</div>
              <div style="font-weight: 900; font-size: 16px;">${quotationData.customer?.name}</div>
              <div style="color: #475569; font-size: 12px; margin-top: 4px;">${quotationData.customer?.address || '-'}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Berlaku Hingga:</div>
              <div style="font-weight: 900; font-size: 16px;">${new Date(quotationData.valid_until).toLocaleDateString('id-ID')}</div>
            </div>
          </div>

          <table className="table" style="width: 100%;">
            <thead>
              <tr>
                <th>Deskripsi Produk / Layanan</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Harga Satuan</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${quotationData.items.map(item => `
                <tr>
                  <td style="font-weight: 700;">${item.product_name}</td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">Rp ${new Intl.NumberFormat('id-ID').format(item.price)}</td>
                  <td style="text-align: right; font-weight: 900;">Rp ${new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div className="totals">
            <div className="total-row">
              <div style="color: #64748b; font-weight: 600;">Subtotal</div>
              <div style="font-weight: 700;">Rp ${new Intl.NumberFormat('id-ID').format(quotationData.subtotal)}</div>
            </div>
            <div className="total-row">
              <div style="color: #64748b; font-weight: 600;">Pajak (11%)</div>
              <div style="font-weight: 700;">Rp ${new Intl.NumberFormat('id-ID').format(quotationData.tax)}</div>
            </div>
            <div className="total-row grand-total">
              <div>TOTAL</div>
              <div>Rp ${new Intl.NumberFormat('id-ID').format(quotationData.total)}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    return pdfBuffer;
  }
}

module.exports = PdfService;
