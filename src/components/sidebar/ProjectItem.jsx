import { useEffect, useState } from 'react';

import useCollectionStore from '../../store/collectionStore';
import useProjectStore from '../../store/projectStore';

import CollectionItem from './CollectionItem';
import {
	ChevronDown,
	ChevronRight,
	FilePlus,
	Folder,
	FolderPlus,
	Trash2,
} from 'lucide-react';

import CreateCollectionDialog from '../collection/CreateCollectionDialog';
export default function ProjectItem({ project }) {
	const [expanded, setExpanded] = useState(false);

	const [openCollectionDialog, setOpenCollectionDialog] = useState(false);
	const { selectProject, deleteProject } = useProjectStore();

	const { collections, loadCollections } = useCollectionStore();

	const projectCollections = collections.filter(
		(collection) => collection.projectId === project._id,
	);

	async function handleClick() {
		selectProject(project);

		await loadCollections();

		setExpanded(!expanded);
	}

	return (
		<div className='select-none'>
			<div
				onClick={() => {
					selectProject(project);
					setExpanded(!expanded);
				}}
				className='group flex cursor-pointer items-center rounded px-2 py-2 hover:bg-zinc-800'>
				<button
					onClick={(e) => {
						e.stopPropagation();
					}}
					className='mr-2'>
					{expanded ? (
						<ChevronDown size={16} />
					) : (
						<ChevronRight size={16} />
					)}
				</button>

				<Folder
					size={16}
					className='mr-2 text-yellow-400'
				/>

				<span className='flex-1 truncate'>{project.name}</span>

				<span className='mr-2 rounded bg-zinc-700 px-2 py-0.5 text-xs'>
					{projectCollections.length}
				</span>

				<button
					className='hidden rounded p-1 hover:bg-zinc-700 group-hover:block'
					onClick={(e) => {
						e.stopPropagation();

						selectProject(project);

						setOpenCollectionDialog(true);
					}}>
					<FilePlus size={15} />
				</button>

				<button
					className='hidden rounded p-1 hover:bg-red-600 group-hover:block'
					onClick={(e) => {
						e.stopPropagation();
						deleteProject(project._id);
					}}>
					<Trash2 size={15} />
				</button>
			</div>

			{expanded && (
				<div className='ml-6'>
					{projectCollections.length === 0 ? (
						<div className='px-2 py-2 text-sm text-zinc-500'>
							No Collections
						</div>
					) : (
						projectCollections.map((collection) => (
							<CollectionItem
								key={collection._id}
								collection={collection}
							/>
						))
					)}
				</div>
			)}
			<CreateCollectionDialog
				open={openCollectionDialog}
				onClose={() => setOpenCollectionDialog(false)}
			/>
		</div>
	);
}
