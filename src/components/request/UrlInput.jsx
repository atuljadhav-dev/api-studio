import useRequestStore from '../../store/requestStore';

export default function UrlInput() {
	const { selectedRequest, updateRequest } = useRequestStore();

	function handleChange(e) {
		updateRequest(selectedRequest._id, { url: e.target.value });
	}

	return (
		<input
			type='text'
			value={selectedRequest.url}
			onChange={handleChange}
			placeholder='https://api.example.com/users'
			className='
w-full
min-w-0
rounded-md
border
border-zinc-700
bg-zinc-900
px-3
py-2
'
		/>
	);
}
