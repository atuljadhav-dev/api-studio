import useRequestStore from "../../../store/requestStore";

export default function BearerAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const bearer = selectedRequest.auth?.bearer || {};

	return (
		<div className='space-y-4'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Token</span>
				<input
					value={bearer.token || ""}
					onChange={(e) =>
						updateRequest(selectedRequest._id, {
							auth: {
								...selectedRequest.auth,
								bearer: {
									...bearer,
									token: e.target.value,
								},
							},
						})
					}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}
