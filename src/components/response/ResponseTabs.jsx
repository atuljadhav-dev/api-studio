import { useState } from 'react';

import ResponseContent from './ResponseContent';

const tabs = ['Pretty', 'Raw', 'Headers', 'Cookies', 'Preview'];

export default function ResponseTabs() {
	const [tab, setTab] = useState('Pretty');

	return (
		<div
			className='
flex
min-h-0
flex-1
flex-col
overflow-hidden
'>
			<div className='flex border-b border-zinc-800'>
				{tabs.map((item) => (
					<button
						key={item}
						onClick={() => setTab(item)}
						className={`px-5 py-3 ${
							tab === item
								? 'border-b-2 border-blue-500 text-blue-400'
								: ''
						}`}>
						{item}
					</button>
				))}
			</div>

			<ResponseContent tab={tab} />
		</div>
	);
}
