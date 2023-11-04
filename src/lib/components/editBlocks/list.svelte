<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Select from '../extra/select.svelte';
	import { updateData } from '../../utils/functions';
	import Textarea from '../extra/textarea.svelte';
	import CloseIcon from '../icons/closeIcon.svelte';
	import PlusIcon from '../icons/plusIcon.svelte';

	export let content: { items: string[]; type: 'ordered' | 'unordered' };
	export let id: string;
	export let active = false;
	const view: ComponentType<SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>> =
		getContext('List');
</script>

{#if active}
	<div class="listEdit">
		<Select
			label="List type"
			preSelected={{ value: content.type, label: content.type }}
			elements={[
				{ value: 'ordered', label: 'ordered' },
				{ value: 'unordered', label: 'unordered' }
			]}
			changeHandler={(detail) => {
				updateData(id, (el) => {
					if (el.name == 'list') el.data.type = detail.value;
					console.log(el);
				});
			}}
		/>
		<div class="itemsEdit">
			<span>List items</span>
			{#each content.items as item, index}
				<div class="itemEdit">
					<Textarea
						width={90}
						textContent={item}
						textLevel={0}
						changeHandler={(text) => {
							updateData(id, (el) => {
								if (el.name == 'list') el.data.items[index] = text;
							});
						}}
					/>
					<!-- svelte-ignore missing-declaration -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span
						class="control"
						on:click|stopPropagation={() => {
							updateData(id, (el) => {
								if (el.name == 'list') el.data.items.splice(index, 1);
							});
						}}><CloseIcon /></span
					>
				</div>
			{/each}
			<!-- svelte-ignore missing-declaration -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="control"
				on:click|stopPropagation={() => {
					updateData(id, (el) => {
						if (el.name == 'list') el.data.items.push('');
					});
				}}><PlusIcon /></span
			>
		</div>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.listEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.listEdit .itemsEdit {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.listEdit .itemsEdit .itemEdit {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.listEdit .itemsEdit .control {
		cursor: pointer;
	}
	.listEdit .itemsEdit span:first-child {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
	.listEdit .itemsEdit span:last-child {
		align-self: center;
	}
</style>
