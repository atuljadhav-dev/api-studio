import Modal from '../ui/Modal';
import RequestForm from './RequestForm';

import useCollectionStore from '../../store/collectionStore';
import useRequestStore from '../../store/requestStore';
import useWorkspaceStore from '../../store/workspaceStore';
import useProjectStore from '../../store/projectStore';

export default function CreateRequestDialog({ open, onClose }) {
	const { selectedCollection } = useCollectionStore();
	const { selectedProject } = useProjectStore();
	const { createRequest, selectRequest } = useRequestStore();

	const { openRequest } = useWorkspaceStore();

	async function handleCreate(request) {
		if (!selectedCollection) return;
		request['collectionId'] = selectedCollection._id;
		request['projectId'] = selectedCollection.projectId;
		const created = await createRequest(request);
		if (!created) {
			return;
		}
		onClose();
		openRequest(created);
		selectRequest(created);
	}

	return (
		<Modal
			open={open}
			title='Create Request'
			onClose={onClose}>
			<RequestForm onSubmit={handleCreate} />
		</Modal>
	);
}
