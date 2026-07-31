import useRequestStore from "../../../store/requestStore";

export default function JwtAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const jwt = selectedRequest.auth?.jwt || {};

	return (
		<div className='space-y-4'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>JWT Token</span>
				<textarea
					value={jwt.token || ""}
					onChange={(e) =>
						updateRequest(selectedRequest._id, {
							auth: {
								...selectedRequest.auth,
								jwt: {
									...jwt,
									token: e.target.value,
								},
							},
						})
					}
					placeholder='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
					rows={5}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}