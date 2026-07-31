import useRequestStore from "../../../store/requestStore";

export default function AwsSignatureAuth() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const aws = selectedRequest.auth?.aws || {};

	function updateAws(field, value) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				aws: {
					...aws,
					[field]: value,
				},
			},
		});
	}

	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Access Key</span>
				<input
					value={aws.accessKey || ""}
					onChange={(e) => updateAws("accessKey", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Secret Key</span>
				<input
					type='password'
					value={aws.secretKey || ""}
					onChange={(e) => updateAws("secretKey", e.target.value)}
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Region</span>
				<input
					value={aws.region || ""}
					onChange={(e) => updateAws("region", e.target.value)}
					placeholder='us-east-1'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
			<label className='block'>
				<span className='text-sm text-zinc-400'>Service</span>
				<input
					value={aws.service || ""}
					onChange={(e) => updateAws("service", e.target.value)}
					placeholder='execute-api'
					className='mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none'
				/>
			</label>
		</div>
	);
}