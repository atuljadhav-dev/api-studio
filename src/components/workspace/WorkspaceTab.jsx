import { X } from 'lucide-react';

import useWorkspaceStore from '../../store/workspaceStore';
import useRequestStore from '../../store/requestStore';

const methodColors = {
	GET: 'text-green-400',

	POST: 'text-blue-400',

	PUT: 'text-orange-400',

	PATCH: 'text-purple-400',

	DELETE: 'text-red-400',
};

export default function WorkspaceTab({ tab, active }) {
	const { selectTab, closeTab, tabs, activeTabId } = useWorkspaceStore();
	const { selectRequest } = useRequestStore();
	return (
		<div
			onClick={() => {
				selectTab(tab.id);
				selectRequest(tab.request);
			}}
			className={`group flex cursor-pointer items-center gap-3 border-r border-zinc-800 shrink-0 whitespace-nowrap px-4
py-2 ${active ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
			<span className={methodColors[tab.method]}>{tab.method}</span>

			<span>{tab.name}</span>

			<button
				onClick={(e) => {
					e.stopPropagation();
					const nextActiveTabId = closeTab(tab.id);
					if (activeTabId === tab.id) {
						const nextActiveTab = tabs.find(
							(workspaceTab) =>
								workspaceTab.id === nextActiveTabId,
						);
						selectRequest(
							nextActiveTab ? nextActiveTab.request : null,
						);
					}
				}}>
				<X size={15} />
			</button>
		</div>
	);
}
