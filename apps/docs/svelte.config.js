import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/adapter-vercel').Config} */
const config = {
  preprocess: vitePreprocess(),
  runtime: "nodejs18.x",
  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        "/docs/Altron/Introduction",
        "/docs/Altron/Getting started",
        "/docs/Altron/Altron cli",
        "/docs/Altron/Components",
        "/docs/Altron/What next",
        "/docs/Usage/Props and css variables",
        "/docs/Usage/Utils",
        "/docs/Usage/Types",
        "/docs/Usage/Events",
      ],
    },
  },
};

export default config;
