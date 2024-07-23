import type { dataBlock } from '@altron/altron/types';

export const exampleData: dataBlock[] = [
	{
		id: '1',

		name: 'header',
		data: {
			level: 2,
			text: 'Svelte the best frontend framework'
		}
	},
	{
		id: '2',
		name: 'image',
		data: {
			caption: 'svelte js',
			file: null,
			src: 'https://miro.medium.com/v2/resize:fit:800/1*694arrMBzrG9pRcLHxC0WA.png'
		}
	},
	{
		id: '3',
		name: 'header',
		data: { level: 3, text: 'Why ?' }
	},
	{
		id: '5',
		name: 'paragraph',
		data: {
			text: 'Svelte, introduced by Rich Harris in 2016, takes a different path compared to traditional JavaScript frameworks like React or Vue. Rather than running in the browser, Svelte shifts the heavy lifting to the build step, transforming components into highly optimized JavaScript at compile time. This approach results in smaller and faster applications, making Svelte a wizard among web frameworks.'
		}
	},
	{
		id: '4',
		name: 'list',
		data: {
			type: 'ordered',
			items: [
				'It is blazingly fast.',
				'It is easy to use.',
				'It is a complete frontend framework no need for other libraries.'
			]
		}
	},
	{
		id: '8',
		name: 'code',
		data: {
			text: `<script>
    let count = 0;
    $: doubled = count * 2;
</script>
<h1>{count} doubled is {doubled}</h1>
<button on:click={() => (count += 1)}> Increment </button>`,
			lang: 'svelte'
		}
	},
	{
		id: '6',
		name: 'embed',
		data: { src: 'https://www.youtube.com/embed/rv3Yq-B8qp4' }
	}
];
