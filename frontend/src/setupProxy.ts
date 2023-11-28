import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express'; // Assuming you're using Express.js

export default function(app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
}
