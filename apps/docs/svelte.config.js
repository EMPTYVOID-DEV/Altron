import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/adapter-auto').Config} */
const config = {
  preprocess: vitePreprocess(),
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
