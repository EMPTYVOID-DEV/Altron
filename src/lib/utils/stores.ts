import { writable } from 'svelte/store';
import type { dataBlock, updateDataType } from './consts.js';
import { setContext } from 'svelte';
import { createEventDispatcher } from 'svelte';

export function createDataStore() {
	const data = writable<dataBlock[]>([]);
	const updateDispatcher = createEventDispatcher();
	const updateData: updateDataType = (id: string, cb: (el: dataBlock) => void) => {
		data.update((prev) => {
			prev.forEach((el) => {
				if (el.id == id) {
					const previousState = { ...el.data };
					cb(el);
					updateDispatcher('BlockUpdate', {
						id,
						previousState,
						newState: { ...el.data }
					});
				}
			});
			return prev;
		});
	};
	setContext('data', data);
	setContext('updateData', updateData);
	return data;
}

export function createWorkingBlockStore() {
	const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
	setContext('workingBlock', workingBlock);
	return workingBlock;
}
