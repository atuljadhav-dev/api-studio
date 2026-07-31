import RequestToolbar from '../request/RequestToolbar';
import RequestTabs from '../request/RequestTabs';

export default function RequestPanel() {
	return (
		<div
			className='
    flex
    min-h-0
    min-w-0
    flex-1
    flex-col
    border-b
    lg:border-b-0
    lg:border-r
    border-zinc-800
    overflow-hidden
'>
			<RequestToolbar />

			<RequestTabs />
		</div>
	);
}
