import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  publicRuntimeConfig: {
    rootURL: process.env.NEXTAUTH_URL
    // rootURL: "https://1864-37-110-219-254.ngrok.io"
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api.irishrail.ie/realtime/realtime.asmx/:path*',
      },
    ]
  },
});
