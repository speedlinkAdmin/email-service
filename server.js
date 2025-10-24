import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mailRoutes from './src/routes/mailRoutes.js';
import { log } from './src/utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api', mailRoutes);

app.listen(port, () => {
  log(`📧 Email service running on port ${port}`);
});
