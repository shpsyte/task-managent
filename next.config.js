/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt", "cookie"],
  },
};

module.exports = nextConfig;
