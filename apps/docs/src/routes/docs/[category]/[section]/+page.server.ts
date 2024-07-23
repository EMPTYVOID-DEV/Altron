import { readMd } from 'sveltedocsmaker/utils';
import { error, type Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ params }) => {
	const [data, err] = await readMd(params.section!, params.category!);

	if (err) {
		console.log(err);
		throw error(404, 'does not exist');
	}

	return data;
};
