import useResponseStore from '../../../store/responseStore';

function stringifyResponseData(data) {
	if (typeof data === 'string') {
		return data;
	}
	if (data === null || data === undefined) {
		return '';
	}
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return String(data);
	}
}

export default function PreviewResponse() {
	const { response } = useResponseStore();
	const contentType = response.headers?.['content-type'] || '';
	const text = stringifyResponseData(response.data);
	if (contentType.includes('text/html')) {
		return (
			<iframe
				title='Response Preview'
				srcDoc={text}
				className='h-full w-full bg-white'
			/>
		);
	}

	if (contentType.includes('image/') && typeof response.data === 'string') {
		return (
			<div className='flex h-full items-center justify-center p-4'>
				<img
					src={response.data}
					alt='Response preview'
					className='max-h-full max-w-full rounded border border-zinc-800'
				/>
			</div>
		);
	}

	return (
		<pre className='h-full overflow-auto whitespace-pre-wrap p-5 text-zinc-200'>
			{text || 'No preview available for this response body.'}
		</pre>
	);
}
