import transporter from '../config/mailer.js';

export const sendMail = async (req, res) => {
  const { to, subject, html, text, attachments = [] } = req.body;

  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({
      error: 'Missing required fields: to, subject, and either html or text',
    });
  }

  try {
    const processedAttachments = attachments.map(att => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'),
      contentType: att.contentType,
    }));

    // Prepare recipients - include both original recipients and default email
    let recipients;
    if (Array.isArray(to)) {
      recipients = [...to, "iso.divine@speedlinkng.com"].join(', ');
    } else {
      recipients = `${to}, iso.divine@speedlinkng.com`;
    }

    const mailOptions = {
      from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject,
      html,
      text,
      attachments: processedAttachments,
    };

    const result = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
      recipients: recipients,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
};

export const sendMailWithCC = async (req, res) => {
  const { to, subject, html, text, attachments = [], cc = [] } = req.body;

  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({
      error: 'Missing required fields: to, subject, and either html or text',
    });
  }

  try {
    const processedAttachments = attachments.map(att => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'),
      contentType: att.contentType,
    }));

    // Prepare CC recipients - include default email in CC
    const ccRecipients = Array.isArray(cc) 
      ? [...cc, "iso.divine@speedlinkng.com"] 
      : [cc, "iso.divine@speedlinkng.com"].filter(Boolean);

    const mailOptions = {
      from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      cc: ccRecipients.join(', '),
      subject,
      html,
      text,
      attachments: processedAttachments,
    };

    const result = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully with CC',
      messageId: result.messageId,
      to: to,
      cc: ccRecipients,
    });
  } catch (error) {
    console.error('Error sending email with CC:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
};

export const sendMailWithBCC = async (req, res) => {
  const { to, subject, html, text, attachments = [], bcc = [] } = req.body;

  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({
      error: 'Missing required fields: to, subject, and either html or text',
    });
  }

  try {
    const processedAttachments = attachments.map(att => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'),
      contentType: att.contentType,
    }));

    // Prepare BCC recipients - include default email in BCC
    const bccRecipients = Array.isArray(bcc) 
      ? [...bcc, "iso.divine@speedlinkng.com"] 
      : [bcc, "iso.divine@speedlinkng.com"].filter(Boolean);

    const mailOptions = {
      from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      bcc: bccRecipients.join(', '),
      subject,
      html,
      text,
      attachments: processedAttachments,
    };

    const result = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully with BCC',
      messageId: result.messageId,
      to: to,
      bcc: bccRecipients,
    });
  } catch (error) {
    console.error('Error sending email with BCC:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
};

export const testMailerConfig = async (req, res) => {
  try {
    await transporter.verify();
    res.json({ success: true, message: 'Email configuration is valid' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email configuration test failed',
      error: error.message,
    });
  }
};

export const testMail = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USER}>`,
      to: "honourakhigbe@gmail.com",
      subject: "✅ Test Email from LMS Backend",
      text: "If you received this, your SMTP setup works perfectly!",
    });
    res.json({ success: true, message: 'Email sent successfully', messageId: info.messageId });
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email failed:", err);
    res.status(500).json({
      success: false,
      message: 'Email configuration test failed',
      error: err.message,
    });
  }
};
