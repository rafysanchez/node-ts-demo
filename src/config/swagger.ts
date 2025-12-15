import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to normalize paths (fixes Windows backslash issues in globs)
const normalizePath = (p: string) => p.replace(/\\/g, '/');

const baseDir = path.join(__dirname, '..');

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Product API',
      version: '1.0.0',
      description: 'A simple REST API in Node.js + TypeScript with CRUD for products.',
    },
    servers: [
      {
        url: '/',
        description: 'Current Server',
      },
    ],
  },
  // We use explicit absolute paths with forward slashes to ensure glob matching works everywhere
  apis: [
    normalizePath(path.join(baseDir, 'modules/**/*.routes.{ts,js}')),
    normalizePath(path.join(baseDir, 'routes/*.{ts,js}')),
  ], 
};

export const specs = swaggerJsdoc(options);