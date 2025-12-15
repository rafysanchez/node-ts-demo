import express, { RequestHandler } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { errorHandler } from './shared/middlewares/errorHandler';
import { specs } from './config/swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger Documentation
// Explicitly cast swaggerUi.serve to bypass minor type mismatch in some environments
app.use('/api-docs', swaggerUi.serve as unknown as RequestHandler, swaggerUi.setup(specs));

// Redirect root to Swagger Docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use('/', router);

// Error Handler
app.use(errorHandler);

export default app;