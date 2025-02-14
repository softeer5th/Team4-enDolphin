import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import { createServer as createViteServer } from 'vite';

import { cookies } from './cookies.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const createServer = async () =>{
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use((req, res, next) => {
    if (req.url !== '/landing' && !cookies(req.headers.cookie).get('accessToken')) {
      res.writeHead(302, { Location: '/landing' });
      res.end();
    } else {
      next();
    }
  });

  app.use(express.static(path.resolve(dirname, 'public')));

  app.use('*', async (req, res, next) => {
    try {
      const template = fs.readFileSync(
        path.resolve(dirname, '../index.html'),
        'utf-8',
      );
      const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ 'Content-Type': 'text/html' })
        .end(transformedTemplate);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
  // eslint-disable-next-line no-console
  console.log('\nServer running at \x1b[33mhttp://localhost:5173\x1b[0m \n');
};

createServer();