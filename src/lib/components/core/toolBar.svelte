<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();
</script>

<button on:click={() => dispatcher('open')}>show</button>
