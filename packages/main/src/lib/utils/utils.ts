import type { FormatType, Format, FormattedText } from './types';

export function htmlToFormattedText(existingFormattedText: FormattedText, html: string): void {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	let text = '';
	let currentOffset = 0;
	const formats: Format[] = [];

	const walker = document.createTreeWalker(
		doc.body,
		NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
	);

	let currentNode: Node | null;
	while ((currentNode = walker.nextNode())) {
		if (currentNode.nodeType === Node.TEXT_NODE) {
			text += currentNode.textContent;
			currentOffset += currentNode.textContent!.length;
		} else if (isFormattingElement(currentNode)) {
			const element = currentNode as HTMLElement;
			const start = currentOffset;
			const end = start + element.textContent!.length;
			const type = getFormatType(element.tagName.toLowerCase());
			formats.push({ start, end, type });
		}
	}

	existingFormattedText.text = text;
	existingFormattedText.formats = optimizeFormats(formats);
}

function optimizeFormats(formats: Format[]): Format[] {
	formats.sort((a, b) => a.start - b.start || a.end - b.end);

	const optimizedFormats: Format[] = [];

	for (const format of formats) {
		if (optimizedFormats.length === 0) {
			optimizedFormats.push(format);
			continue;
		}

		const lastFormat = optimizedFormats[optimizedFormats.length - 1];

		if (lastFormat.type === format.type) {
			if (format.start <= lastFormat.end) {
				lastFormat.end = Math.max(lastFormat.end, format.end);
			} else {
				optimizedFormats.push(format);
			}
		} else {
			optimizedFormats.push(format);
		}
	}

	return optimizedFormats;
}

export function generateHTML(formattedText: FormattedText): string {
	const segments = parseFormattedText(formattedText);
	const html = segments.map((segment) => createMarkup(segment.formats, segment.text)).join('');
	return sanitizeHTML(html);
}

function createMarkup(formats: FormatType[], text: string): string {
	return formats.reduce((acc, format) => {
		const tag = formatToTag(format);
		return `<${tag}>${acc}</${tag}>`;
	}, text);
}

function getFormatType(tagName: string): FormatType {
	switch (tagName) {
		case 'b':
			return 'bold';
		case 'u':
			return 'underline';
		case 'i':
			return 'italic';
	}
}

function formatToTag(format: FormatType): string {
	switch (format) {
		case 'bold':
			return 'b';
		case 'italic':
			return 'i';
		case 'underline':
			return 'u';
	}
}

function isFormattingElement(node: Node): boolean {
	return (
		node.nodeType === Node.ELEMENT_NODE &&
		['b', 'i', 'u'].includes((node as Element).tagName.toLowerCase())
	);
}

function sanitizeHTML(html: string): string {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const sanitize = (node: Node): string => {
		if (node.nodeType === Node.TEXT_NODE) {
			return encodeSpecialChars(node.textContent || '');
		}
		const element = node as Element;
		if (['b', 'i', 'u'].includes(element.tagName.toLowerCase())) {
			const sanitizedContent = Array.from(element.childNodes).map(sanitize).join('');
			return `<${element.tagName.toLowerCase()}>${sanitizedContent}</${element.tagName.toLowerCase()}>`;
		}
		return encodeSpecialChars(element.outerHTML);
	};
	return Array.from(doc.body.childNodes).map(sanitize).join('');
}

function encodeSpecialChars(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function parseFormattedText(
	formattedText: FormattedText
): { text: string; formats: FormatType[] }[] {
	const points = new Set([
		0,
		formattedText.text.length,
		...formattedText.formats.flatMap((f) => [f.start, f.end])
	]);
	const sortedPoints = Array.from(points).sort((a, b) => a - b);

	return sortedPoints.slice(0, -1).map((start, i) => {
		const end = sortedPoints[i + 1];
		const segmentText = formattedText.text.slice(start, end);
		const segmentFormats = formattedText.formats
			.filter((format) => format.start <= start && format.end > start)
			.map((format) => format.type);

		return { text: segmentText, formats: segmentFormats };
	});
}
