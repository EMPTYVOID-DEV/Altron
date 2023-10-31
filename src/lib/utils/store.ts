import { writable } from 'svelte/store';
import type { dataBlock } from './types.js';
import shortUUID from 'short-uuid';

export const data = writable<dataBlock[]>([
	{
		type: 'header',
		id: shortUUID('123456').generate(),
		data: {
			text: 'hello friend',
			level: 1
		}
	}
]);

export const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
