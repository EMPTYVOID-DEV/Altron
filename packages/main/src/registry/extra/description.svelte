<script>
	/**@type {string}*/
	export let title;
	/**@type {string}*/
	export let description;
</script>

<div class="description">
	<span>{title}</span>
	<p>{description}</p>
</div>

<style>
	.description {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.description span {
		text-transform: capitalize;
		font-weight: 600;
	}
	.description :is(span, p) {
		color: var(--textColor);
		font-size: var(--small);
	}
</style>
