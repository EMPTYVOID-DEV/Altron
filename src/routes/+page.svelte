<script>
	import Main from '$lib/components/core/main.svelte';
	import { AltronRichText, getData } from '$lib/index';
</script>

<div>
	<Main
		intailData={[
			{
				id: '123',
				name: 'paragraph',
				data: { text: 'hello' }
			},
			{
				id: '12',
				name: 'header',
				data: { text: 'hello', level: 1 }
			},

			{
				id: '14',
				name: 'quote',
				data: { text: 'my quote', owner: 'me' }
			}
		]}
	/>
	<button
		on:click={() => {
			console.log(getData());
		}}>save</button
	>
</div>

<style>
	div {
		width: 50vw;
		position: absolute;
		top: 70%;
		left: 50%;
		translate: -50% -50%;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
