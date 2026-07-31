import KeyValueTable from '../table/KeyValueTable';
import useRequestStore from '../../../store/requestStore';

export default function CookiesTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const cookies = selectedRequest.cookies || [];

	function onChange(index, field, value) {
		const updatedCookies = [...cookies];
		updatedCookies[index] = { ...updatedCookies[index], [field]: value };

		updateRequest(selectedRequest._id, { cookies: updatedCookies });
	}

	function addRow() {
		updateRequest(selectedRequest._id, {
			cookies: [...cookies, { key: '', value: '', enabled: true }],
		});
	}
	function deleteRow(index) {
		const updatedCookies = [...cookies];
		updatedCookies.splice(index, 1);
		updateRequest(selectedRequest._id, { cookies: updatedCookies });
	}
	return (
		<KeyValueTable
			title='Cookie'
			rows={cookies}
			onChange={onChange}
			addRow={addRow}
			deleteRow={deleteRow}
		/>
	);
}
