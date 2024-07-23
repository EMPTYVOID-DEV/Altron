<script>
	import Logo from './logo.svelte';
</script>

<nav class="navbar">
	<Logo mode={true} />
	<div class="externalLinks">
		<a target="_blank" href="https://github.com/EMPTYVOID-DEV/Altron">
			<i class="fa-brands fa-github" style="color: #ffffff;"></i>
		</a>
		<a target="_blank" href="https://www.npmjs.com/package/@altron/altron"
			><i class="fa-brands fa-npm" style="color: #ffffff;"></i></a
		>
	</div>
</nav>

<style>
	.navbar {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 30px;
	}
	.navbar .externalLinks {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	.externalLinks i {
		font-size: 2.3rem;
	}
</style>
