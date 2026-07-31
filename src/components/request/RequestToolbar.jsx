import MethodDropdown from './MethodDropdown';
import UrlInput from './UrlInput';
import SendButton from './SendButton';
import useRequestStore from '../../store/requestStore';

export default function RequestToolbar() {
	const { selectedRequest } = useRequestStore();

	if (!selectedRequest) {
		return null;
	}

	return (
		<div
			className='
flex
flex-wrap
items-center
gap-2
border-b
border-zinc-800
p-3
'>
			<MethodDropdown />

			<div className='flex-1'>
				<UrlInput />
			</div>

			<SendButton />
		</div>
	);
}
