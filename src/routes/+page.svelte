<script lang="ts">
	import type { dataBlock } from '$lib/utils/types';
	import Altron from '../lib/components/core/main.svelte';
	const intialData: dataBlock[] = [
		{
			id: '2',
			name: 'header',
			data: {
				level: 2,
				text: 'Seoul the morgin star city'
			}
		},
		{
			id: '2',
			name: 'image',
			data: {
				caption: 'why is this?',
				file: null,
				src: 'https://assets.aifsabroad.com/images/w_1680,h_961,c_fill/f_auto,q_auto:good/v1687977649/wordpress_uploads/south-korea-seoul-temple-water/south-korea-seoul-temple-water.jpg?_i=AA'
			}
		}
	];
	let altron: Altron = null;
</script>

<div>
	<Altron
		bind:this={altron}
		width="50%"
		on:afterEditing={(e) => {
			console.log(altron.getData());
		}}
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
