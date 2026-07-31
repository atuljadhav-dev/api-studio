import { useEffect } from "react";

import useProjectStore from "../../store/projectStore";

import ProjectItem from "./ProjectItem";
import useCollectionStore from "../../store/collectionStore";
import useRequestStore from "../../store/requestStore";

export default function ProjectTree() {
	const { projects, loadProjects } = useProjectStore();
	const { loadCollections } = useCollectionStore();
	const { loadRequests } = useRequestStore();
	useEffect(() => {
		loadProjects();
		loadCollections();
		loadRequests();
	}, []);

	return (
		<div className='p-2'>
			{projects.map((project) => (
				<ProjectItem key={project._id} project={project} />
			))}
		</div>
	);
}
