import {createAPI} from 'nextkit';

export const api = createAPI({
	async onError() {
		return {
			message: 'Something went wrong',
			status: 500,
		};
	},
});
