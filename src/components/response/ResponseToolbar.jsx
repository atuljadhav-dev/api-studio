import useResponseStore from '../../store/responseStore';

export default function ResponseToolbar() {
	const { response } = useResponseStore();

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
			<div>
				<span className='text-zinc-400'>Status</span>

				<div
					className={`${
						response.status >= 200 && response.status < 300
							? 'text-green-500'
							: response.status >= 400
								? 'text-red-500'
								: 'text-yellow-500'
					}`}>
					{response.status}
				</div>
			</div>

			<div>
				<span className='text-zinc-400'>Time</span>

				<div>{response.time} ms</div>
			</div>

			<div>
				<span className='text-zinc-400'>Size</span>

				<div>{response.size}</div>
			</div>
		</div>
	);
}
