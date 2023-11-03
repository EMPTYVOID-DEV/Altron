// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { get } from 'svelte/store';
import { data } from './utils/stores';
import Main from './components/core/main.svelte';

function getData() {
	return get(data);
}

export { Main, getData };
