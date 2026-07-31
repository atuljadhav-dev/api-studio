import KeyValueTable from '../table/KeyValueTable';
import useRequestStore from '../../../store/requestStore';

export default function HeadersTab() {
	const { selectedRequest, updateRequest } = useRequestStore();

	function onChange(index, field, value) {
		const headers = [...selectedRequest.headers];

		headers[index] = { ...headers[index], [field]: value };

		updateRequest(selectedRequest._id, { headers });
	}

	function addRow() {
		updateRequest(selectedRequest._id, {
			headers: [
				...selectedRequest.headers,
				{ key: '', value: '', enabled: true },
			],
		});
	}
	function deleteRow(index) {
		const headers = [...selectedRequest.headers];
		headers.splice(index, 1);
		updateRequest(selectedRequest._id, { headers });
	}

	return (
		<KeyValueTable
			title='Header'
			rows={selectedRequest.headers}
			onChange={onChange}
			addRow={addRow}
			deleteRow={deleteRow}
		/>
	);
}
