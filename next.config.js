/** @type {import('next').NextConfig} */
const path = require('path'); // 1. path 선언

const nextConfig = {
  experimental: {
    appDir: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')], //sassOptions 옵션 추가
    },
  },
}

module.exports = nextConfig;
