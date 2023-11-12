import type { dataBlock } from './consts';
import { get } from 'svelte/store';
import { data, workingBlock } from './stores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateData(id: string, cb: (el: dataBlock) => void) {
	data.update((prev) => {
		prev.forEach((el) => {
			if (el.id == id) {
				cb(el);
			}
		});
		return prev;
	});
}

export function getData() {
	return get(data);
}

export function setData(newData: dataBlock[] | ((prev: dataBlock[]) => dataBlock[])) {
	if (typeof newData == 'function') data.set(newData(get(data)) || []);
	else if (typeof newData == 'object') data.set(newData);
}

export function getWorkingBlock() {
	return get(workingBlock);
}
