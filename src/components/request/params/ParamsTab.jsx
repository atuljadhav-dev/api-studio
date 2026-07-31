import useRequestStore from '../../../store/requestStore';
import KeyValueTable from '../table/KeyValueTable';
export default function ParamsTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	function addRow() {
		updateRequest(selectedRequest._id, {
			params: [
				...selectedRequest.params,
				{ key: '', value: '', enabled: true },
			],
		});
	}
	function onChange(index, field, value) {
		const params = [...selectedRequest.params];

		params[index] = { ...params[index], [field]: value };

		updateRequest(selectedRequest._id, { params });
	}
	function deleteRow(index) {
		const params = [...selectedRequest.params];
		params.splice(index, 1);
		updateRequest(selectedRequest._id, { params });
	}
	return (
		<KeyValueTable
			title='Params'
			rows={selectedRequest.params}
			onChange={onChange}
			deleteRow={deleteRow}
			addRow={addRow}
		/>
	);
}
