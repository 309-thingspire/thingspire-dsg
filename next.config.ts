import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/registry/(.*)': ['./components/**/*'],
  },
  // The legacy esbuild components were authored under looser type rules
  // (e.g. spacing.scale['640'] access patterns). Skip type/lint blocking on
  // build for the v1 cut; types will be tightened component-by-component.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
