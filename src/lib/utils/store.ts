import { writable } from 'svelte/store';
import type { dataBlock } from './types.js';
import shortUUID from 'short-uuid';

export const data = writable<dataBlock[]>([
	{
		type: 'paragraph',
		id: shortUUID('123456').generate(),
		data: {
			text: 'hello friend'
		}
	}
]);

export const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
