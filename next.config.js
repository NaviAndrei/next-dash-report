/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'next-dash-report';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Dezactivează optimizarea implicită a imaginilor
  },
  assetPrefix: isProd ? `/${repoName}/` : '',
  basePath: isProd ? `/${repoName}` : '',
  output: 'export'
};

module.exports = nextConfig; 