<script lang="ts">
	import Select from 'svelte-select';
	export let label: string;
	export let elements: { label: string; value: any }[];
	export let changeHandler: (item: { value: any; label: string }) => void;
	export let preSelected: { label: string; value: any };
</script>

<div class="select">
	<span>{label}</span>
	<Select
		value={preSelected}
		placeholder={'Select a ' + label}
		items={elements}
		showChevron={true}
		hideEmptyState={true}
		clearable={false}
		--chevron-color={'var(--textColor)'}
		--background={'transparent'}
		--placeholder-color={'var(--textColor)'}
		--input-color={'var(--textColor)'}
		--list-background={'var(--bgColor)'}
		--list-border={'1px solid var(--secondaryColor)'}
		--selected-item-color={'var(--textColor)'}
		--item-color={'var(--textColor)'}
		--item-first-border-radius={'0'}
		--item-hover-bg={'color-mix(in srgb , var(--secondaryColor) 40%, white 0%)'}
		--item-hover-color={'var(--textColor)'}
		--item-is-active-color={'var(--textColor)'}
		--item-is-active-bg={'var(--secondaryColor)'}
		--border={'2px solid var(--secondaryColor)'}
		--border-focused={'2px solid var(--secondaryColor)'}
		--border-hover={'2px solid var(--secondaryColor)'}
		--clear-icon-color={'var(--textColor)'}
		on:change={(event) => {
			changeHandler(event.detail);
		}}
	/>
</div>

<style>
	.select {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 6px;
	}
	.select span {
		font-size: var(--small);
		font-weight: 600;
		margin-left: 10px;
		color: var(--textColor);
	}
</style>
