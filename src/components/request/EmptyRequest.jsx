export default function EmptyRequest() {
	return (
		<div className='flex h-full items-center justify-center bg-zinc-950 text-zinc-500'>
			<div className='text-center'>
				<h2 className='mb-2 text-2xl font-semibold'>
					No Request Selected
				</h2>

				<p>Select a request from the sidebar or create a new one.</p>
			</div>
		</div>
	);
}
