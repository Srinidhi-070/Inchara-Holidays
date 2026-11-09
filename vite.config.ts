import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

/**
 * Development API Middleware Plugin
 * Directly routes /api/* requests to serverless handlers in api/ during local development
 */
function apiDevMiddleware(): Plugin {
  return {
    name: 'inchara-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) {
          return next();
        }

        try {
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;
          let modulePath = '';

          if (pathname === '/api/inquire') modulePath = './api/inquire.ts';
          else if (pathname === '/api/admin/login') modulePath = './api/admin/login.ts';
          else if (pathname === '/api/admin/inquiries') modulePath = './api/admin/inquiries.ts';
          else if (pathname === '/api/admin/stats') modulePath = './api/admin/stats.ts';
          else if (pathname === '/api/services') modulePath = './api/services.ts';
          else return next();

          // Collect body for POST/PATCH/PUT requests
          let body: any = null;
          if (['POST', 'PATCH', 'PUT'].includes(req.method || '')) {
            const chunks: any[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            try {
              body = rawBody ? JSON.parse(rawBody) : {};
            } catch {
              body = rawBody;
            }
          }

          // Attach serverless helper methods
          (req as any).body = body;
          (req as any).query = Object.fromEntries(url.searchParams.entries());

          (res as any).status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          (res as any).json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          const mod = await server.ssrLoadModule(modulePath);
          const handler = mod.default || mod;
          await handler(req, res);
        } catch (err: any) {
          console.error('[API Dev Server Error]:', err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
