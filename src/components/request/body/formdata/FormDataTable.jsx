import FormDataRow from './FormDataRow';

export default function FormDataTable({ rows, onChange, addRow }) {
	return (
		<div className='flex h-full flex-col'>
			<div className='grid grid-cols-[70px_1fr_120px_2fr] border-b border-zinc-800 bg-zinc-900 px-4 py-3'>
				<div>Enabled</div>
				<div>Key</div>
				<div>Type</div>
				<div>Value</div>
			</div>

			<div className='flex-1 overflow-auto'>
				{rows.map((row, index) => (
					<FormDataRow
						key={index}
						row={row}
						index={index}
						onChange={onChange}
					/>
				))}
			</div>

			<div className='border-t border-zinc-800 p-3'>
				<button
					onClick={addRow}
					className='rounded bg-zinc-800 px-4 py-2'>
					Add Field
				</button>
			</div>
		</div>
	);
}
