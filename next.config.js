/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_API: 'AIzaSyBCfE1olDX2ziV1hd7D9PJyUeyxjfxCjBM',
    MAPBOX_API: 'pk.eyJ1IjoiaGlyZW9uZSIsImEiOiJjbGN5cWs4OWgwdmxqM3JwN2k4bnVuOXpmIn0.IknsVMqUbl2TO1Ul5t-XCw',
    FIREBASE_API: 'AIzaSyBCfE1olDX2ziV1hd7D9PJyUeyxjfxCjBM',
    S3_ACCESS_KEY: 'AKIAUMBLTBX5SBOWIW7P',
    S3_SECRET: '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'
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

// AWS Console sigin URL ---  https://300739137019.signin.aws.amazon.com/console
