/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/clerk/:path*",
        destination: "https://bold-mule-71.clerk.accounts.dev/:path*",
      },
    ];
  },
};

export default nextConfig; // ✅ ES Modules 形式
