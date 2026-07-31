import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
class HttpService {
	async execute(request) {
		const start = performance.now();
		const body = request.body;
		const data = this.buildRequestBody(body);

		const headers = this.buildHeaders(
			request.headers,
			request.cookies,
			request.auth,
			body,
		);
		if (body?.type === 'form-data') {
			Object.assign(headers, data.getHeaders());
		}
		try {
			const response = await axios({
				method: request.method,
				url: request.url,
				headers: headers,
				params: this.buildParams(request.params),
				data: data,
				timeout: request.settings?.timeout || 30000,
				validateStatus: () => true,
				responseType: 'arraybuffer',
			});
			const contentType = response.headers['content-type'] || '';

			let responseData;

			if (contentType.startsWith('image/')) {
				responseData =
					`data:${contentType};base64,` +
					Buffer.from(response.data).toString('base64');
			} else if (contentType.includes('application/json')) {
				responseData = JSON.parse(
					Buffer.from(response.data).toString('utf8'),
				);
			} else {
				responseData = Buffer.from(response.data).toString('utf8');
			}
			const end = performance.now();
			return {
				success: true,
				data: {
					status: response.status,
					statusText: response.statusText,
					headers: response.headers,
					data: responseData,
					time: Math.round(end - start),
					size: this.calculateSize(response.data),
				},
			};
		} catch (error) {
			if (error.response) {
				const end = performance.now();
				return {
					success: false,
					data: {
						message: error.message,
						code: error.code,
						status: error.response.status,
						statusText: error.response.statusText,
						headers: error.response.headers,
						data: Buffer.from(error.response.data).toString('utf8'),
						time: Math.round(end - start),
						size: this.calculateSize(error.response.data),
					},
				};
			}

			return {
				success: false,
				data: {
					message: error.message,
					code: error.code,
					status: null,
					statusText: null,
					headers: null,
					data: null,
					time: null,
					size: null,
				},
			};
		}
	}
	calculateSize(data) {
		const bytes = Buffer.byteLength(JSON.stringify(data ?? {}), 'utf8');

		if (bytes < 1024) {
			return `${bytes} B`;
		}

		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(2)} KB`;
		}

		return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
	}
	buildHeaders(headers = [], cookies = [], auth = {}, body) {
		const result = {};

		headers
			.filter((h) => h.enabled && h.key)
			.forEach((h) => {
				result[h.key] = h.value;
			});

		const cookieHeader = this.buildCookieHeader(cookies);
		if (cookieHeader) {
			result.Cookie = cookieHeader;
		}
		switch (auth.type) {
			case 'bearer':
				if (auth.bearer?.token) {
					result.Authorization = `Bearer ${auth.bearer.token}`;
				}
				break;

			case 'basic':
				if (auth.basic?.username || auth.basic?.password) {
					result.Authorization =
						'Basic ' +
						Buffer.from(
							`${auth.basic.username}:${auth.basic.password}`,
						).toString('base64');
				}
				break;
		}
		if (
			body?.type === 'raw' &&
			body.format === 'json' &&
			!result['Content-Type']
		) {
			result['Content-Type'] = 'application/json';
		}
		return result;
	}

	buildCookieHeader(cookies = []) {
		return cookies
			.filter((cookie) => cookie.enabled && cookie.key)
			.map((cookie) => `${cookie.key}=${cookie.value}`)
			.join('; ');
	}

	buildParams(params = []) {
		const result = {};

		params
			.filter((p) => p.enabled && p.key)
			.forEach((p) => {
				result[p.key] = p.value;
			});

		return result;
	}
	buildRequestBody(body) {
		if (!body) return undefined;

		switch (body.type) {
			case 'raw':
				if (body.format === 'json') {
					try {
						return JSON.parse(body.content);
					} catch {
						return body.content;
					}
				}

				return body.content;

			case 'urlencoded':
				return Object.fromEntries(
					body.urlEncoded
						.filter((item) => item.enabled && item.key)
						.map((item) => [item.key, item.value]),
				);

			case 'form-data': {
				const form = new FormData();

				body.formData.forEach((item) => {
					if (item.enabled === false) return;
					if (item.type === 'file') {
						form.append(
							item.key,
							fs.createReadStream(item.filePath),
						);
					} else {
						form.append(item.key, item.value);
					}
				});

				return form;
			}

			case 'binary':
				return fs.readFileSync(body.binary.filePath);

			default:
				return undefined;
		}
	}
}

export default new HttpService();
