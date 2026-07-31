import useRequestStore from "../../store/requestStore";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

export default function MethodDropdown() {
	const { selectedRequest, updateRequest } = useRequestStore();

	function handleChange(e) {
		updateRequest(selectedRequest._id, {
			method: e.target.value,
		});
	}

	return (
		<select
			value={selectedRequest.method}
			onChange={handleChange}
			className='rounded border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none'>
			{methods.map((method) => (
				<option key={method}>{method}</option>
			))}
		</select>
	);
}
