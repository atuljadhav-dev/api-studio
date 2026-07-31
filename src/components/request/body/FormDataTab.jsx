import FormDataTable from './formdata/FormDataTable';
import useRequestStore from '../../../store/requestStore';

export default function FormDataTab() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const formData = selectedRequest.body?.formData || [];

	function updateFormData(index, field, value) {
		const updated = [...formData];
		updated[index] = { ...updated[index], [field]: value };

		updateRequest(selectedRequest._id, {
			body: { ...selectedRequest.body, formData: updated },
		});
	}

	function addRow() {
		updateRequest(selectedRequest._id, {
			body: {
				...selectedRequest.body,
				formData: [
					...formData,
					{
						key: '',
						type: 'text',
						value: '',
						filePath: '',
						enabled: true,
					},
				],
			},
		});
	}

	return (
		<FormDataTable
			title='Form Field'
			rows={formData}
			onChange={updateFormData}
			addRow={addRow}
		/>
	);
}
