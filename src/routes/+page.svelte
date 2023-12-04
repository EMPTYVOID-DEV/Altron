<script lang="ts">
	import Altron from '../lib/components/core/main.svelte';
</script>

<div>
	<Altron
		codeBlockLanguages={['mam', 'papa']}
		on:BlockDeleted={(e) => {
			console.log('deleted');
			console.log(e.detail);
		}}
		on:BlockAdded={(e) => {
			console.log('add');
			console.log(e.detail);
		}}
		on:BlockUpdate={(e) => {
			console.log('update');
			console.log(e.detail);
		}}
		on:afterEditing={(e) => {
			console.log('after editing');
			console.log(e.detail);
		}}
		on:editing={(e) => {
			console.log('edit');
			console.log(e.detail);
		}}
		on:focusing={(e) => {
			console.log('focus');
			console.log(e.detail);
		}}
	/>
</div>

<style>
	div {
		width: 100vw;
		display: grid;
		grid-template-columns: 45% 45%;
	}
</style>
