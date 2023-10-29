<script lang="ts">
	import Textarea from './textarea.svelte';

	export let data: { text: string };
	export let id: string;
</script>

<Textarea textLevel="body" textContent={data.text} changeHandler={() => {}} />
