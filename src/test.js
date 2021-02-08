const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware( {
      target: "https://thingplugpf.sktiot.com:9443",
      changeOrigin: true,
    })
  );
};
