import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

// Fix for "Cannot find name '__dirname'" error in TypeScript when types are missing
declare const __dirname: string;

// Helper to normalize paths (fixes Windows backslash issues in globs)
const normalizePath = (p: string) => p.replace(/\\/g, '/');

// Since tsconfig is set to "commonjs", __dirname is globally available.
// We should NOT use import.meta.url here.
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