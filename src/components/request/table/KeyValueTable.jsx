import KeyValueRow from './KeyValueRow';

export default function KeyValueTable({ title, rows, onChange, addRow, deleteRow }) {
	return (
		<div className='flex h-full flex-col'>
			<div className='grid grid-cols-[80px_1fr_1fr_60px] border-b border-zinc-800 bg-zinc-900 px-4 py-3 font-medium'>
				<div>Enabled</div>
				<div>Key</div>
				<div>Value</div>
				<div></div>
			</div>

			<div className='flex-1 overflow-auto'>
				{rows.map((row, index) => (
					<KeyValueRow
						key={index}
						row={row}
						index={index}
						onChange={onChange}
						deleteRow={deleteRow}
					/>
				))}
			</div>

			<div className='border-t border-zinc-800 p-3'>
				<button
					onClick={addRow}
					className='rounded bg-zinc-800 px-4 py-2 hover:bg-zinc-700'>
					Add {title}
				</button>
			</div>
		</div>
	);
}
