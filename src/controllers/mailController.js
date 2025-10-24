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

    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@example.com',
      to: Array.isArray(to) ? to.join(', ') : to,
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
    });
  } catch (error) {
    console.error('Error sending email:', error);
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
