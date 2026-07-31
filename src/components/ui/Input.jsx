export default function Input(props) {
	return (
		<input
			{...props}
			className='w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-blue-500'
		/>
	);
}
