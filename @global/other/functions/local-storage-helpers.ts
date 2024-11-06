import type { Request } from '@global/other';

export function saveToLS(req: Request): void {
	try {
		const stringifiedRequers = JSON.stringify(req);

		localStorage.setItem('userData', stringifiedRequers);
	} catch (e: any) {
		throw new Error('[HELPER ERROR]', e);
	}
}

export function parseFromLS(): Request {
	try {
		const dataFromLS = localStorage.getItem('userData');
		const parsedReq = JSON.parse(dataFromLS!);

		return parsedReq as unknown as Request;
	} catch (e: any) {
		throw new Error('[HELPER ERROR]', e);
	}
}
