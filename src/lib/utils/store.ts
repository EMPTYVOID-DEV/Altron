import { writable } from 'svelte/store';
import type { dataBlock } from './types.js';

export const data = writable<dataBlock[]>([]);
