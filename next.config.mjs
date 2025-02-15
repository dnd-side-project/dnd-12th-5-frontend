/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
     const apiUrl =
       process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
