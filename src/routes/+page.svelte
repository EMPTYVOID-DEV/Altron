<script>
	import Main from '$lib/components/core/main.svelte';
	import { oneLight } from 'svelte-highlight/styles';
</script>

<div>
	<Main
		primaryColor={'#ffd900'}
		textColor={'#ffffff'}
		secondaryColor={'#ff1e00'}
		codeTheme={oneLight}
		bgColor={'#121212'}
		codeBlockLanguages={['yaml', 'xml']}
	/>
</div>

<style>
	:global(body) {
		background-color: #121212;
	}
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
