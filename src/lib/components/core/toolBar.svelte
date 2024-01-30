<script lang="ts">
	import type { blocks, dataBlock } from '../../utils/types';
	import { getContext, createEventDispatcher, SvelteComponent, type ComponentType } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	const languages = getContext('languages');
	const defaultData = new Map<blocks, any>([
		['paragraph', { text: 'hello friend' }],
		['image', { file: null, caption: 'image', src: '' }],
		['code', { text: 'console.log("hello friend")', lang: languages[0] }],
		['quote', { text: 'hello friend', owner: 'me' }],
		['header', { text: 'hello friend', level: 4 }],
		['list', { items: ['hello friend'], type: 'ordered' }],
		['space', { size: 24 }],
		['checklist', { items: [{ value: 'hello friend', checked: true }] }],
		['attachment', { file: null, title: 'my attachment', size: 0, src: '', type: '' }],
		['embed', { src: '' }]
	]);
	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const toolBarUI = componentMap.get('toolBarUi');
	const eventDispatcher = createEventDispatcher();
	const workingBlock: Writable<{ state: 'focused' | 'editing'; id: string }> =
		getContext('workingBlock');
	const setData = getContext('setData') as (
		newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])
	) => void;
	function add(name: blocks) {
		const defaultValue = defaultData.get(name);
		const id = nanoid(8);
		setData((prev) => {
			prev.push({ id, name, data: { ...defaultValue } });
			eventDispatcher('blockAdded', {
				id
			});
			return prev;
		});
		if ($workingBlock?.state == 'editing')
			eventDispatcher('afterEditing', {
				id: $workingBlock.id
			});
		workingBlock.set({ id, state: 'editing' });
	}
</script>

<svelte:component this={toolBarUI} {add} />
