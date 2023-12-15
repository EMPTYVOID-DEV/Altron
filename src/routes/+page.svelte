<script lang="ts">
	import { onMount } from 'svelte';
	import Altron from '../lib/components/core/main.svelte';
	import Header from './header.svelte';

	let main: Altron = null;

	onMount(() => {
		main.setData([{ id: '2', name: 'header', data: { text: 'hello', level: 1 } }]);
	});
</script>

<div>
	<Altron
		on:blockUpdate={(e) => {
			console.log(e);
		}}
		bind:this={main}
		customHeader={Header}
		viewMode={true}
	/>
</div>

<style>
	div {
		width: 90vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
