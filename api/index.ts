import { registerRoutes } from '../server/routes';
import express from 'express';
import { createServer } from 'http';

// Create a simple Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
(async () => {
  try {
    const server = createServer();
    await registerRoutes(server, app);
    console.log('Routes registered successfully');
  } catch (error) {
    console.error('Error registering routes:', error);
  }
})();

// Vercel API handler
export default async function handler(req: any, res: any) {
  // Handle the request with Express
  app(req, res, (err) => {
    if (err) {
      console.error('Express error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

// Export config to tell Vercel this is an API route
export const config = {
  api: {
    externalResolver: true,
  },
};