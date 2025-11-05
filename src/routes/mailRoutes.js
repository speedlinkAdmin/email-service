import express from 'express';
import { sendMail, sendMailWithBCC, sendMailWithCC, testMailerConfig } from '../controllers/mailController.js';

const router = express.Router();



router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email service is running' });
});

router.post('/send-email', sendMail);
router.post('/send-with-cc', sendMailWithCC);
router.post('/send-with-bcc', sendMailWithBCC);
router.get('/test-config', testMailerConfig);

export default router;
