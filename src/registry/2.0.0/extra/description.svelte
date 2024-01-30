<script>
	export let title;
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
		font-size: var(--small);
	}
</style>
