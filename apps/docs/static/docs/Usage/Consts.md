Altron exposes some consts under **@altron/altron/consts** .

#### `dynamicRegistry` 

This is a map that links the block names with their component dependencies paths. Used in dynamic import.

```javascript
export const dynamicRegistry = new Map<string, string[]>([
	[
		'core',
		[
			'core/blockWrapperUi',
			'core/toolBarUi',
			'icons/plusIcon',
			'icons/closeIcon',
			'icons/menuIcon',
			'extra/menu',
			'extra/dialog',
			'icons/deleteIcon',
			'icons/upIcon',
			'icons/downIcon'
		]
	],
	['paragraph', ['viewBlocks/viewParagraph', 'extra/textArea',
	    'icons/paragraphIcon']],
	['header', ['viewBlocks/viewHeader', 'icons/headerIcon', 'extra/select',
	    'extra/textArea']],
	[
		'image',
		['viewBlocks/viewImage', 'extra/upload', 'extra/input',
		'icons/uploadIcon', 'icons/imageIcon']
	],
	[
		'list',
		[
			'viewBlocks/viewList',
			'extra/listHandler',
			'extra/textArea',
			'icons/plusIcon',
			'icons/closeIcon',
			'extra/select',
			'icons/listIcon'
		]
	],
	[
		'quote',
		[
			'viewBlocks/viewQuote',
			'icons/closeQuoteIcon',
			'icons/openQuoteIcon',
			'extra/input',
			'extra/textArea'
		]
	],
	['space', ['viewBlocks/viewSpace', 'extra/input', 'icons/spaceIcon']],
	[
		'code',
		[
			'viewBlocks/viewCode',
			'icons/copyIcon',
			'icons/doneIcon',
			'icons/codeIcon',
			'extra/select',
			'extra/textArea'
		]
	],
	[
		'checklist',
		[
			'viewBlocks/viewChecklist',
			'extra/checklistHandler',
			'icons/closeIcon',
			'icons/plusIcon',
			'extra/textArea',
			'icons/unCheckedIcon',
			'icons/checkedIcon',
			'icons/checklistIcon'
		]
	],
	[
		'embed',
		['viewBlocks/viewEmbed', 'icons/embedIcon', 'extra/description',
		'extra/input', 'extra/loading']
	],
	[
		'attachment',
		[
			'viewBlocks/viewAttachment',
			'icons/attachmentIcon',
			'icons/uploadIcon',
			'extra/input',
			'extra/upload'
		]
	]
]);
```


#### mimeToFileNameMap 

This maps a mime type to a file extension this get used by the **viewAttachment**.

```Typescript
export const mimeToFileNameMap = new Map([
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
	['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
	'docx'],
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
	['application/vnd.openxmlformats-
	officedocument.presentationml.presentation', 'pptx'],
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
	['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
	'xlsx'],
	['application/xml', 'xml'],
	['application/vnd.mozilla.xul+xml', 'xul'],
	['application/zip', 'zip'],
	['video/3gpp; audio/3gpp', '3gp'],
	['video/3gpp2; audio/3gpp2', '3g2'],
	['application/x-7z-compressed', '7z']
]);
```