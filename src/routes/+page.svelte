<script lang="ts">
	import Altron from '../lib/components/core/main.svelte';
</script>

<Altron
	codeBlockLanguages={['mam', 'papa']}
	on:BlockDeleted={(e) => {
		console.log(e.detail);
	}}
/>
