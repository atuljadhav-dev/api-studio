import { useState } from 'react';
import CreateProjectDialog from '../project/CreateProjectDialog';
import ProjectTree from '../sidebar/ProjectTree';
import { PanelLeft, PanelLeftClose } from 'lucide-react';

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState(false);
	if (!expanded) {
		return (
			<div
				onClick={() => setExpanded(true)}
				className='flex h-screen w-12 cursor-pointer items-center justify-center border-r border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800'>
				<PanelLeft />
			</div>
		);
	}
	return (
		<>
			<div className='hidden lg:flex w-72 xl:w-80 border-r border-zinc-800 bg-zinc-900 flex-col shrink-0'>
				<div className='flex items-center justify-between border-b border-zinc-800 px-4 py-3'>
					<h2 className='text-lg font-semibold'>Projects</h2>

					<div className='flex items-center gap-2'>
						<button
							onClick={() => setOpen(true)}
							className='rounded bg-blue-600 px-2 py-1 text-sm hover:bg-blue-700'>
							New
						</button>
						<div
							className='ml-2 cursor-pointer hover:text-zinc-400'
							onClick={() => setExpanded(false)}>
							<PanelLeftClose />
						</div>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto'>
					<ProjectTree />
				</div>
			</div>

			<CreateProjectDialog
				open={open}
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
