import { data } from './stores';
import type { dataBlock } from './consts';

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
