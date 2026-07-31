import useRequestStore from "../../../store/requestStore";

export default function ApiKeyAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const apiKey = selectedRequest.auth?.apiKey || {};

	function updateApiKey(field, value) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				apiKey: {
					...apiKey,
					[field]: value,
				},
			},
		});
	}

	return (
		<div className='space-y-4'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Key</span>
				<input
					value={apiKey.key || ""}
					onChange={(e) => updateApiKey("key", e.target.value)}
					placeholder='X-API-Key'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>

			<label className='block'>
				<span className='text-sm text-zinc-400'>Value</span>
				<input
					value={apiKey.value || ""}
					onChange={(e) => updateApiKey("value", e.target.value)}
					placeholder='your-api-key'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>

			<label className='block'>
				<span className='text-sm text-zinc-400'>Add To</span>
				<select
					value={apiKey.addTo || "header"}
					onChange={(e) => updateApiKey("addTo", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'>
					<option value='header'>Header</option>
					<option value='query'>Query Params</option>
				</select>
			</label>
		</div>
	);
}