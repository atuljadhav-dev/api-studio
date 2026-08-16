import Modal from '../ui/Modal';
import CollectionForm from './CollectionForm';

import useProjectStore from '../../store/projectStore';
import useCollectionStore from '../../store/collectionStore';
import { toast } from 'react-toastify';

export default function CreateCollectionDialog({ open, onClose, setExpanded }) {
	const { selectedProject } = useProjectStore();

	const { createCollection, loadCollections } = useCollectionStore();

	async function handleCreate(data) {
		if (!selectedProject) return;
		try {
			await createCollection(selectedProject._id, data);
			await loadCollections();
			setExpanded(true);
		} catch (err) {
			toast.error(err);
		}

		onClose();
	}

	return (
		<Modal
			open={open}
			title="Create Collection"
			onClose={onClose}>
			<CollectionForm onSubmit={handleCreate} />
		</Modal>
	);
}
