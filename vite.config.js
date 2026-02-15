import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Mini-plugin to handle /api routes locally in Vite
const apiPlugin = (env) => ({
  name: 'api-server',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const filePath = path.join(process.cwd(), url.pathname + '.js');
        if (fs.existsSync(filePath)) {
          try {
            // Inject env into process for the handler
            Object.assign(process.env, env);

            const { default: handler } = await import(`file://${filePath}?t=${Date.now()}`);
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
                res.status = (code) => { res.statusCode = code; return res; };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                };
                await handler(req, res);
              } catch (e) {
                console.error('API Execution Error:', e);
                res.statusCode = 500;
                res.json({ error: e.message, stack: e.stack });
              }
            });
            return;
          } catch (e) {
            console.error('API Import Error:', e);
          }
        }
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), apiPlugin(env)],
  };
})
