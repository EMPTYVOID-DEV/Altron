import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: [
				'/docs/Altron/Introduction',
				'/docs/Altron/Getting started',
				'/docs/Altron/Altron cli',
				'/docs/Altron/Components',
				'/docs/Altron/Import methods',
				'/docs/Altron/What next',
				'/docs/Usage/Props and css variables',
				'/docs/Usage/Utils',
				'/docs/Usage/Types',
				'/docs/Usage/Events',
				'/docs/Usage/Consts'
			]
		}
	}
};

export default config;
