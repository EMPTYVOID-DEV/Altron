import { writable } from 'svelte/store';
import type { dataBlock } from './consts.js';

export const data = writable<dataBlock[]>([]);

export const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
