<script>
	import { AltronRichText } from '$lib/index';
</script>

<div>
	<AltronRichText />
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
