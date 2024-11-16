// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3-alpha-sig.figma.com'], // Agrega el dominio del recurso de la imagen
  },
  // Otras configuraciones de Next.js pueden ir aquí
};

export default nextConfig;
