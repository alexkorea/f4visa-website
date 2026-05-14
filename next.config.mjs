/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'f4visa.net' }],
        destination: 'https://www.f4visa.net/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
