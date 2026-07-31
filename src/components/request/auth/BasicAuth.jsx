import useRequestStore from "../../../store/requestStore";

export default function BasicAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const basic = selectedRequest.auth?.basic || {};

	function updateBasic(field, value) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				basic: {
					...basic,
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
					value={basic.username || ""}
					onChange={(e) => updateBasic("username", e.target.value)}
					placeholder='username'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>

			<label className='block'>
				<span className='text-sm text-zinc-400'>Password</span>
				<input
					type='password'
					value={basic.password || ""}
					onChange={(e) => updateBasic("password", e.target.value)}
					placeholder='password'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}