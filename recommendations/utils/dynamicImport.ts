import { dynamicRegistry } from '@altron/altron/consts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function Load() {
	const componentMap = new Map();
	const neededComponents = [
		...dynamicRegistry.get('core'),
		...dynamicRegistry.get('header'),
		...dynamicRegistry.get('paragraph')
	];
	for (const compPath of neededComponents) {
		const path = `$lib/components/altron/${compPath}.svelte`;
		const comp = (await import(path)).default;
		componentMap.set(compPath.split('/')[1], comp);
	}
	return componentMap;
}
