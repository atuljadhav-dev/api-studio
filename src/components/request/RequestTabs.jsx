import { useState } from 'react';

import useRequestStore from '../../store/requestStore';

import EmptyRequest from './EmptyRequest';
import RequestTabContent from './RequestTabContent';

const tabs = ['Params', 'Headers', 'Auth', 'Cookies', 'Body'];

export default function RequestTabs() {
	const { selectedRequest } = useRequestStore();

	const [activeTab, setActiveTab] = useState('Params');

	if (!selectedRequest) {
		return <EmptyRequest />;
	}

	return (
		<div 
			className='
flex
min-h-0
flex-1
flex-col
overflow-hidden
'>
			<div className='flex border-b border-zinc-800 bg-zinc-900'>
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-5 py-3 ${
							activeTab === tab
								? 'border-b-2 border-blue-500 text-blue-400'
								: 'text-zinc-400'
						}`}>
						{tab}
					</button>
				))}
			</div>

			<div className='min-h-0 flex-1'>
				<RequestTabContent tab={activeTab} />
			</div>
		</div>
	);
}
