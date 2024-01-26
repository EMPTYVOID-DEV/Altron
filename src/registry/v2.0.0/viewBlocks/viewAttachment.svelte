<script>
	import UploadIcon from '../icons/uploadIcon.svelte';
	export let src;
	export let title;
	export let type;
	export let size;
	const mimeToFileNameMap = new Map([
		['audio/aac', 'aac'],
		['application/x-abiword', 'abw'],
		['application/x-freearc', 'arc'],
		['image/avif', 'avif'],
		['video/x-msvideo', 'avi'],
		['application/vnd.amazon.ebook', 'azw'],
		['application/octet-stream', 'bin'],
		['image/bmp', 'bmp'],
		['application/x-bzip', 'bz'],
		['application/x-bzip2', 'bz2'],
		['application/x-cdf', 'cda'],
		['application/x-csh', 'csh'],
		['text/css', 'css'],
		['text/csv', 'csv'],
		['application/msword', 'doc'],
		['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
		['application/vnd.ms-fontobject', 'eot'],
		['application/epub+zip', 'epub'],
		['application/gzip', 'gz'],
		['image/gif', 'gif'],
		['text/html', 'html'],
		['image/vnd.microsoft.icon', 'ico'],
		['text/calendar', 'ics'],
		['application/java-archive', 'jar'],
		['image/jpeg', 'jpeg'],
		['text/javascript', 'js'],
		['application/json', 'json'],
		['application/ld+json', 'jsonld'],
		['audio/midi', 'mid'],
		['text/javascript', 'mjs'],
		['audio/mpeg', 'mp3'],
		['video/mp4', 'mp4'],
		['video/mpeg', 'mpeg'],
		['application/vnd.apple.installer+xml', 'mpkg'],
		['application/vnd.oasis.opendocument.presentation', 'odp'],
		['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
		['application/vnd.oasis.opendocument.text', 'odt'],
		['audio/ogg', 'oga'],
		['video/ogg', 'ogv'],
		['application/ogg', 'ogx'],
		['audio/opus', 'opus'],
		['font/otf', 'otf'],
		['image/png', 'png'],
		['application/pdf', 'pdf'],
		['application/x-httpd-php', 'php'],
		['application/vnd.ms-powerpoint', 'ppt'],
		['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
		['application/vnd.rar', 'rar'],
		['application/rtf', 'rtf'],
		['application/x-sh', 'sh'],
		['image/svg+xml', 'svg'],
		['application/x-tar', 'tar'],
		['image/tiff', 'tif'],
		['video/mp2t', 'ts'],
		['font/ttf', 'ttf'],
		['text/plain', 'txt'],
		['application/vnd.visio', 'vsd'],
		['audio/wav', 'wav'],
		['audio/webm', 'weba'],
		['video/webm', 'webm'],
		['image/webp', 'webp'],
		['font/woff', 'woff'],
		['font/woff2', 'woff2'],
		['application/xhtml+xml', 'xhtml'],
		['application/vnd.ms-excel', 'xls'],
		['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
		['application/xml', 'xml'],
		['application/vnd.mozilla.xul+xml', 'xul'],
		['application/zip', 'zip'],
		['video/3gpp; audio/3gpp', '3gp'],
		['video/3gpp2; audio/3gpp2', '3g2'],
		['application/x-7z-compressed', '7z']
	]);
</script>

<div class="attachment">
	{#if src == ''}
		<span class="notSelected">An attachment has'not been uploaded yet</span>
	{:else}
		<div class="info">
			<span class="type">{mimeToFileNameMap.get(type) || 'file'}</span>
			<div class="subInfo">
				<span>{title}</span>
				<span>{(size / Math.pow(10, 6)).toString().substring(0, 5)} Mb</span>
			</div>
		</div>
		<a href={src} download={title} on:click|stopPropagation>
			<UploadIcon />
		</a>
	{/if}
</div>

<style>
	.attachment {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
	.notSelected {
		display: block;
		color: var(--textColor);
		font-weight: bold !important;
		text-transform: capitalize;
		padding-block: 10px;
		border-left: 5px solid var(--errorColor);
		padding-left: 10px;
	}
	.attachment .info {
		display: flex;
		align-items: center;
		gap: 20px;
		border-left: 6px solid var(--primaryColor);
		padding-left: 10px;
	}
	.attachment .info .type {
		color: var(--primaryColor);
		font-weight: bold;
		text-transform: capitalize;
	}
	.subInfo {
		display: flex;
		flex-direction: column;
	}
	.subInfo span:first-child {
		color: var(--textColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.subInfo span:last-child {
		color: color-mix(in srgb, var(--primaryColor) 60%, white 0%);
	}
	.attachment a :global(path) {
		fill: var(--textColor);
	}
</style>
