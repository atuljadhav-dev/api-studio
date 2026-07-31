import { useState } from 'react';
import {
	ChevronDown,
	ChevronRight,
	Folder,
	FilePlus,
	Trash2,
} from 'lucide-react';

import useCollectionStore from '../../store/collectionStore';
import useRequestStore from '../../store/requestStore';

import RequestItem from './RequestItem';
import CreateRequestDialog from '../request/CreateRequestDialog';

export default function CollectionItem({ collection }) {
	const [expanded, setExpanded] = useState(false);
	const [openRequestDialog, setOpenRequestDialog] = useState(false);
	const { selectCollection, deleteCollection } = useCollectionStore();

	const { requests, loadRequests } = useRequestStore();

	const collectionRequests = requests.filter(
		(request) => request.collectionId === collection._id,
	);

	return (
		<div className='select-none'>
			<div
				onClick={() => {
					selectCollection(collection);

					setExpanded(!expanded);
				}}
				className='group flex cursor-pointer items-center rounded px-2 py-2 hover:bg-zinc-800'>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setExpanded(!expanded);
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

				<span className='flex-1 truncate'>{collection.name}</span>

				<span className='mr-2 rounded bg-zinc-700 px-2 py-0.5 text-xs'>
					{collectionRequests.length}
				</span>

				<button
					className='hidden rounded p-1 hover:bg-zinc-700 group-hover:block'
					onClick={(e) => {
						e.stopPropagation();

						selectCollection(collection);

						setOpenRequestDialog(true);
					}}>
					<FilePlus size={15} />
				</button>

				<button
					className='hidden rounded p-1 hover:bg-red-600 group-hover:block'
					onClick={(e) => {
						e.stopPropagation();
						deleteCollection(collection._id);
					}}>
					<Trash2 size={15} />
				</button>
			</div>

			{expanded && (
				<div className='ml-6'>
					{collectionRequests.length === 0 ? (
						<div className='px-2 py-2 text-sm text-zinc-500'>
							No requests
						</div>
					) : (
						collectionRequests.map((request) => (
							<RequestItem
								key={request._id}
								request={request}
							/>
						))
					)}
				</div>
			)}
			<CreateRequestDialog
				open={openRequestDialog}
				onClose={() => setOpenRequestDialog(false)}
			/>
		</div>
	);
}
