<script>
	import Main from '$lib/components/core/main.svelte';
	import shortUUID from 'short-uuid';
</script>

<div>
	<Main
		intailData={[
			{
				name: 'header',
				id: shortUUID('123456').generate(),
				data: {
					text: 'hello friend',
					level: 1
				}
			},
			{
				name: 'code',
				id: '88',
				data: {
					lang: 'bash',
					text: 'hello'
				}
			},
			{
				id: '99',
				name: 'paragraph',
				data: {
					text: 'hello'
				}
			}
		]}
		viewMode={false}
	/>
</div>

<style>
	div {
		width: 50vw;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}

	@media screen and (width < 768px) {
		div {
			width: 95vw;
		}
	}
</style>
