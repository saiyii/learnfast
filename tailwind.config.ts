import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

module.exports = {
  plugins: ["@tailwindcss/postcss"],
};
