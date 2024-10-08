export type IframeSettings = {
	allow?: string;
	sandbox?: string;
	referrerpolicy?:
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url';
	credentialless?: boolean;
	loading?: 'eager' | 'lazy';
};

export type blocks =
	| 'image'
	| 'code'
	| 'quote'
	| 'paragraph'
	| 'header'
	| 'list'
	| 'space'
	| 'checklist'
	| 'attachment'
	| 'embed';

export type dataBlock =
	| { name: 'image'; id: string; data: { file: File; caption: string; src: string } }
	| { name: 'paragraph'; id: string; data: { formattedText: FormattedText } }
	| { name: 'code'; id: string; data: { text: string; lang: string } }
	| { name: 'quote'; id: string; data: { formattedText: FormattedText; owner: string } }
	| { name: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
	| { name: 'space'; id: string; data: { size: number } }
	| { name: 'list'; id: string; data: { items: FormattedText[]; type: 'ordered' | 'unordered' } }
	| { name: 'checklist'; id: string; data: { items: { value: FormattedText; checked: boolean }[] } }
	| {
			name: 'attachment';
			id: string;
			data: { file: File; title: string; size: number; src: string; type: string };
	  }
	| { name: 'embed'; id: string; data: { src: string } };

export type updateDataType = (id: string, cb: (el: dataBlock) => void) => void;

export type FormatType = 'bold' | 'italic' | 'underline';

export type Format = { start: number; end: number; type: FormatType };

export type FormattedText = { text: string; formats: Format[] };
