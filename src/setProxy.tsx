const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app : any) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};