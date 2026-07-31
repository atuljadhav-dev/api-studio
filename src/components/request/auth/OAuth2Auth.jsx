import useRequestStore from "../../../store/requestStore";

export default function OAuth2Auth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const oauth2 = selectedRequest.auth?.oauth2 || {};

	function updateOAuth(field, value) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				oauth2: {
					...oauth2,
					[field]: value,
				},
			},
		});
	}

	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Access Token</span>
				<input
					value={oauth2.accessToken || ""}
					onChange={(e) => updateOAuth("accessToken", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Refresh Token</span>
				<input
					value={oauth2.refreshToken || ""}
					onChange={(e) => updateOAuth("refreshToken", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Client ID</span>
				<input
					value={oauth2.clientId || ""}
					onChange={(e) => updateOAuth("clientId", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Client Secret</span>
				<input
					type='password'
					value={oauth2.clientSecret || ""}
					onChange={(e) => updateOAuth("clientSecret", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Token URL</span>
				<input
					value={oauth2.tokenUrl || ""}
					onChange={(e) => updateOAuth("tokenUrl", e.target.value)}
					placeholder='https://auth.example.com/oauth/token'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Scopes</span>
				<input
					value={oauth2.scopes || ""}
					onChange={(e) => updateOAuth("scopes", e.target.value)}
					placeholder='read:users write:users'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}
