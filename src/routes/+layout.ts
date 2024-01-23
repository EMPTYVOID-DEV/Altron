export const load = async () => {
	const components = [];
	const blocks = ['textarea', 'input', 'loading', 'select', 'upload'];
	for (const block of blocks) {
		const current = (await import(`$lib/components/extra/${block}.svelte`)).default;
		components.push(current);
	}
	console.log(components);
	return {
		components
	};
};
