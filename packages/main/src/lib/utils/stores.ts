import { writable } from 'svelte/store';
import type { dataBlock, updateDataType } from './types.js';

export function createDataStore(intialData: dataBlock[]) {
	const data = writable<dataBlock[]>(intialData);
	const updateData: updateDataType = (id: string, cb: (el: dataBlock) => void) => {
		data.update((prev) => {
			prev.forEach((el) => {
				if (el.id == id) cb(el);
			});
			return prev;
		});
	};
	return { data, updateData };
}

export function createWorkingBlockStore() {
	const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
	return workingBlock;
}
