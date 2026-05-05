const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  async sendQuotationEmail(to, quotationData, pdfBuffer) {
    const mailOptions = {
      from: `"Mark ISP" <${process.env.MAIL_FROM}>`,
      to,
      subject: `Penawaran Layanan Mark ISP - ${quotationData.quot_number}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
          <h2 style="color: #1e3a8a;">Halo ${quotationData.customer?.name},</h2>
          <p>Terima kasih telah tertarik dengan layanan Mark ISP.</p>
          <p>Bersama email ini kami lampirkan dokumen penawaran (Quotation) dengan nomor <strong>${quotationData.quot_number}</strong>.</p>
          <p>Silakan tinjau dokumen terlampir. Jika ada pertanyaan, jangan ragu untuk membalas email ini atau menghubungi tim sales kami.</p>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p>Salam hangat,<br><strong>Tim Mark ISP</strong></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Quotation-${quotationData.quot_number}.pdf`,
          content: pdfBuffer
        }
      ]
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

module.exports = MailService;
