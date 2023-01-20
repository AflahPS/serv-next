/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GMAP_API: 'AIzaSyBCfE1olDX2ziV1hd7D9PJyUeyxjfxCjBM',
    MAPBOX_API: 'pk.eyJ1IjoiaGlyZW9uZSIsImEiOiJjbGN5cWs4OWgwdmxqM3JwN2k4bnVuOXpmIn0.IknsVMqUbl2TO1Ul5t-XCw',
    FIREBASE_API: 'AIzaSyBCfE1olDX2ziV1hd7D9PJyUeyxjfxCjBM'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
