const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app : any) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};


const express = require('express')
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

// module.exports = function (app : any) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: "http://localhost:8080",
//       pathRewrite: {
//         '^/api': '',
//       },
//     }),
//   );
// };