import useWorkspaceStore from '../../store/workspaceStore';

import WorkspaceTab from './WorkspaceTab';

export default function WorkspaceTabs() {
	const { tabs, activeTabId } = useWorkspaceStore();

	if (!tabs.length) {
		return (
			<div className='border-b border-zinc-800 px-5 py-3 text-zinc-500'>
				No Open Requests
			</div>
		);
	}

	return (
		<div
			className='
    flex
    h-12
    shrink-0
    items-center
    overflow-x-auto
    whitespace-nowrap
    border-b
    border-zinc-800
    bg-zinc-950
'>
			{tabs.map((tab) => (
				<WorkspaceTab
					key={tab.id}
					tab={tab}
					active={tab.id === activeTabId}
				/>
			))}
		</div>
	);
}
