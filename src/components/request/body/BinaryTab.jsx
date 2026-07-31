import useRequestStore from "../../../store/requestStore";

export default function BinaryTab() {
	const { selectedRequest, updateRequest } = useRequestStore();

	return (
		<div className='space-y-4 p-4'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>File Path</span>
				<input
					value={selectedRequest.body?.binary?.filePath || ""}
					onChange={(e) =>
						updateRequest(selectedRequest._id, {
							body: {
								...selectedRequest.body,
								binary: {
									...(selectedRequest.body?.binary || {}),
									filePath: e.target.value,
								},
							},
						})
					}
					placeholder='C:\\path\\to\\file.bin'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<p className='text-xs text-zinc-500'>
				Enter an absolute file path for binary body requests.
			</p>
		</div>
	);
}
