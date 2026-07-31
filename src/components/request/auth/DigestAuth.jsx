import useRequestStore from "../../../store/requestStore";

export default function DigestAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const digest = selectedRequest.auth?.digest || {};

	function updateDigest(field, value) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				digest: {
					...digest,
					[field]: value,
				},
			},
		});
	}

	return (
		<div className='space-y-4'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Username</span>
				<input
					value={digest.username || ""}
					onChange={(e) => updateDigest("username", e.target.value)}
					placeholder='username'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>

			<label className='block'>
				<span className='text-sm text-zinc-400'>Password</span>
				<input
					type='password'
					value={digest.password || ""}
					onChange={(e) => updateDigest("password", e.target.value)}
					placeholder='password'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}
