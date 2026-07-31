import KeyValueTable from "../table/KeyValueTable";
import useRequestStore from "../../../store/requestStore";

export default function UrlEncodedTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const urlEncoded = selectedRequest.body?.urlEncoded || [];

	function updateUrlEncoded(index, field, value) {
		const updated = [...urlEncoded];
		updated[index] = {
			...updated[index],
			[field]: value,
		};

		updateRequest(selectedRequest._id, {
			body: {
				...selectedRequest.body,
				urlEncoded: updated,
			},
		});
	}

	function addRow() {
		updateRequest(selectedRequest._id, {
			body: {
				...selectedRequest.body,
				urlEncoded: [
					...urlEncoded,
					{
						key: "",
						value: "",
						enabled: true,
					},
				],
			},
		});
	}

	return (
		<KeyValueTable
			title='Param'
			rows={urlEncoded}
			onChange={updateUrlEncoded}
			addRow={addRow}
		/>
	);
}