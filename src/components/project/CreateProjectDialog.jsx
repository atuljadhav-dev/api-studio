import Modal from "../ui/Modal";
import ProjectForm from "./ProjectForm";

import useProjectStore from "../../store/projectStore";

export default function CreateProjectDialog({ open, onClose }) {
	const { createProject } = useProjectStore();

	async function handleCreate(project) {
		await createProject(project);

		onClose();
	}

	return (
		<Modal open={open} title='Create Project' onClose={onClose}>
			<ProjectForm onSubmit={handleCreate} />
		</Modal>
	);
}
