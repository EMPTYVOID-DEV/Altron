import CHECKLISTHANDLER from './extra/checklistHandler.svelte';
import DESCRIPTION from './extra/description.svelte';
import DIALOG from './extra/dialog.svelte';
import INPUT from './extra/input.svelte';
import LISTHANDLER from './extra/listHandler.svelte';
import LOADING from './extra/loading.svelte';
import MENU from './extra/menu.svelte';
import SELECT from './extra/select.svelte';
import TEXTAREA from './extra/textArea.svelte';
import UPLOAD from './extra/upload.svelte';
import VIEWATTACHMENT from './viewBlocks/viewAttachment.svelte';
import VIEWCHECKLIST from './viewBlocks/viewChecklist.svelte';
import VIEWCODE from './viewBlocks/viewCode.svelte';
import VIEWEMBED from './viewBlocks/viewEmbed.svelte';
import VIEWHEADER from './viewBlocks/viewHeader.svelte';
import VIEWIMAGE from './viewBlocks/viewImage.svelte';
import VIEWLIST from './viewBlocks/viewList.svelte';
import VIEWPARAGRAPH from './viewBlocks/viewParagraph.svelte';
import VIEWQUOTE from './viewBlocks/viewQuote.svelte';
import VIEWSPACE from './viewBlocks/viewSpace.svelte';
import ATTACHMENTICON from './icons/attachmentIcon.svelte';
import CHECKEDICON from './icons/checkedIcon.svelte';
import CHECKLISTICON from './icons/checklistIcon.svelte';
import CLOSEICON from './icons/closeIcon.svelte';
import CLOSEQUOTEICON from './icons/closeQuoteIcon.svelte';
import CODEICON from './icons/codeIcon.svelte';
import COPYICON from './icons/copyIcon.svelte';
import DELETEICON from './icons/deleteIcon.svelte';
import DONEICON from './icons/doneIcon.svelte';
import DOWNICON from './icons/downIcon.svelte';
import EMBEDICON from './icons/embedIcon.svelte';
import HEADERICON from './icons/headerIcon.svelte';
import IMAGEICON from './icons/imageIcon.svelte';
import LISTICON from './icons/listIcon.svelte';
import MENUICON from './icons/menuIcon.svelte';
import OPENQUOTEICON from './icons/openQuoteIcon.svelte';
import PARAGRAPHICON from './icons/paragraphIcon.svelte';
import PLUSICON from './icons/plusIcon.svelte';
import SPACEICON from './icons/spaceIcon.svelte';
import UNCHECKEDICON from './icons/unCheckedIcon.svelte';
import UPICON from './icons/upIcon.svelte';
import UPLOADICON from './icons/uploadIcon.svelte';
import BLOCKWRAPPERUI from './core/blockWrapperUi.svelte';
import TOOLBARUI from './core/toolBarUi.svelte';

export const componentMap = new Map([
	['checklistHandler', CHECKLISTHANDLER],
	['description', DESCRIPTION],
	['dialog', DIALOG],
	['input', INPUT],
	['listHandler', LISTHANDLER],
	['loading', LOADING],
	['menu', MENU],
	['select', SELECT],
	['textArea', TEXTAREA],
	['upload', UPLOAD],
	['viewAttachment', VIEWATTACHMENT],
	['viewChecklist', VIEWCHECKLIST],
	['viewCode', VIEWCODE],
	['viewEmbed', VIEWEMBED],
	['viewHeader', VIEWHEADER],
	['viewImage', VIEWIMAGE],
	['viewList', VIEWLIST],
	['viewParagraph', VIEWPARAGRAPH],
	['viewQuote', VIEWQUOTE],
	['viewSpace', VIEWSPACE],
	['attachmentIcon', ATTACHMENTICON],
	['checkedIcon', CHECKEDICON],
	['checklistIcon', CHECKLISTICON],
	['closeIcon', CLOSEICON],
	['closeQuoteIcon', CLOSEQUOTEICON],
	['codeIcon', CODEICON],
	['copyIcon', COPYICON],
	['deleteIcon', DELETEICON],
	['doneIcon', DONEICON],
	['downIcon', DOWNICON],
	['embedIcon', EMBEDICON],
	['headerIcon', HEADERICON],
	['imageIcon', IMAGEICON],
	['listIcon', LISTICON],
	['menuIcon', MENUICON],
	['openQuoteIcon', OPENQUOTEICON],
	['paragraphIcon', PARAGRAPHICON],
	['plusIcon', PLUSICON],
	['spaceIcon', SPACEICON],
	['unCheckedIcon', UNCHECKEDICON],
	['upIcon', UPICON],
	['uploadIcon', UPLOADICON],
	['blockWrapperUi', BLOCKWRAPPERUI],
	['toolBarUi', TOOLBARUI]
]);
