import 'dotenv/config';
import app from './app';
import { logger } from './shared/utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});