/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "res.cloudinary.com", "lh3.googleusercontent.com"],
    unoptimized: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
