/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pptx1h7dnbbvaazk.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
