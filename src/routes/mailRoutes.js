import express from 'express';
import { sendMail, testMailerConfig } from '../controllers/mailController.js';

const router = express.Router();
testMailerConfig()
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email service is running' });
});

router.post('/send-email', sendMail);
router.get('/test-config', testMailerConfig);

export default router;
