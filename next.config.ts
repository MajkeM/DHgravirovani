/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // důležité pro static export
  images: {
    unoptimized: true, // GitHub Pages neumí optimalizaci obrázků
  },
  basePath: "/DHgravirovani", // tady dej název svého repa
  assetPrefix: "/DHgravirovani/",
};

export default nextConfig;
