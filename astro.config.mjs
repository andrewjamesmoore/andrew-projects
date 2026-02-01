// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "server",
  adapter: vercel({}),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
