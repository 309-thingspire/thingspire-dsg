import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/registry/(.*)': ['./components/**/*'],
  },
}

export default nextConfig
