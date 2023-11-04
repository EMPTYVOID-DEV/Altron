<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Select from '../extra/select.svelte';
	import Textarea from '../extra/textarea.svelte';
	import { updateData } from '../../utils/functions';
	export let content: { text: string; level: 1 | 2 | 3 | 4 };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> =
		getContext('Header');
</script>

{#if active}
	<div class="headerEdit">
		<Select
			preSelected={{ value: content.level, label: 'h' + content.level }}
			label="Header level"
			elements={[
				{ value: 1, label: 'h1' },
				{ value: 2, label: 'h2' },
				{ value: 3, label: 'h3' },
				{ value: 4, label: 'h4' }
			]}
			changeHandler={(detail) => {
				updateData(id, (prev) => {
					if (prev.name == 'header') {
						prev.data.level = detail.value;
						content.level = detail.value;
					}
				});
			}}
		/>
		<div>
			<span>Header content</span>
			<Textarea
				textLevel={content.level}
				textContent={content.text}
				changeHandler={(text) => {
					updateData(id, (prev) => {
						if (prev.name == 'header') prev.data.text = text;
					});
				}}
			/>
		</div>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.headerEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.headerEdit div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.headerEdit div span {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
</style>
