<script lang="ts">
	import { onMount } from 'svelte';
	import Altron from '../lib/components/core/main.svelte';

	let main: Altron = null;

	onMount(() => {
		main.setData([
			{
				id: '2',
				name: 'image',
				data: {
					content: null,
					state: {
						caption: 'osaka',
						src: 'https://www.nippon.com/en/ncommon/contents/guide-to-japan/2339170/2339170.jpg'
					}
				}
			},
			{
				id: '3',
				name: 'attachment',
				data: {
					content: null,
					state: {
						src: 'https://www.nippon.com/en/ncommon/contents/guide-to-japan/2339170/2339170.jpg',
						title: 'osaka',
						type: 'jpg',
						size: 200000
					}
				}
			}
		]);
	});
</script>

<div>
	<Altron
		on:blockUpdate={(e) => {
			console.log(e);
		}}
		on:blockDeleted={(e) => {
			console.log(e.detail);
		}}
		bind:this={main}
		width="50%"
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
