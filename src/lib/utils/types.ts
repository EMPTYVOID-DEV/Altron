export type blocks = 'image' | 'video' | 'code' | 'quote' | 'paragraph' | 'header' | 'list';

// *TODO: add links and bold text

export type dataBlock =
	| { type: 'image'; id: string; data: { href: string; alt: string } }
	| { type: 'video'; id: string; data: { href: string; alt: string } }
	| { type: 'paragraph'; id: string; data: { text: string } }
	| { type: 'code'; id: string; data: { text: string; lang: string } }
	| { type: 'quote'; id: string; data: { text: string; owner: string } }
	| { type: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
	| { type: 'list'; id: string; data: { items: string[]; type: 'ordered' | 'unordered' } };
