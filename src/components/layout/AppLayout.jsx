import Sidebar from './Sidebar';
import RequestPanel from './RequestPanel';
import ResponsePanel from './ResponsePanel';
import WorkspaceTabs from '../workspace/WorkspaceTabs';

export default function AppLayout() {
	return (
		<div className='flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100'>
			<Sidebar />

			<div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
				<WorkspaceTabs />

				<div className='flex flex-1 flex-col lg:flex-row overflow-hidden'>
					<RequestPanel />

					<ResponsePanel />
				</div>
			</div>
		</div>
	);
}
