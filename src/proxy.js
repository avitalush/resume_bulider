const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/image',
  createProxyMiddleware({
    target: 'https://firebasestorage.googleapis.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/image': '', // remove the /image prefix from the URL
    },
  })
);

app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
