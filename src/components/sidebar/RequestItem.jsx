import { Trash2 } from 'lucide-react';
import useRequestStore from '../../store/requestStore';
import useWorkspaceStore from '../../store/workspaceStore';

const colors = {
	GET: 'text-green-500',
	POST: 'text-blue-500',
	PUT: 'text-orange-500',
	PATCH: 'text-purple-500',
	DELETE: 'text-red-500',
	HEAD: 'text-yellow-500',
	OPTIONS: 'text-cyan-500',
};

export default function RequestItem({ request }) {
	const { selectedRequest, selectRequest, deleteRequest } = useRequestStore();

	const active = selectedRequest?._id === request._id;
	const displayName = request.name || request.url || 'New Request';
	const { openRequest } = useWorkspaceStore();
	return (
		<div
			className={`flex group cursor-pointer items-center rounded px-3 py-2 text-sm hover:bg-zinc-800 ${
				active ? 'bg-zinc-800' : ''
			}`}>
			<div
				className='flex flex-1 items-center'
				onClick={() => {
					openRequest(request);
					selectRequest(request);
				}}>
				<span
					className={`mr-2 w-16 font-semibold ${colors[request.method]}`}>
					{request.method}
				</span>

				<span className='truncate'>{displayName}</span>
			</div>
			<button
				className='hidden rounded items-end p-1 hover:bg-red-600 group-hover:block'
				onClick={(e) => {
					e.stopPropagation();
					deleteRequest(request._id);
				}}>
				<Trash2 size={15} />
			</button>
		</div>
	);
}
