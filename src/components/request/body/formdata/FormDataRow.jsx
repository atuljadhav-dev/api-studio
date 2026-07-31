export default function KeyValueRow({ row, index, onChange }) {
	return (
		<div className='grid grid-cols-[70px_1fr_140px_2fr] gap-3 border-b border-zinc-800 px-4 py-2'>
			<div className='flex items-center'>
				<input
					type='checkbox'
					checked={row.enabled}
					onChange={(e) =>
						onChange(index, 'enabled', e.target.checked)
					}
				/>
			</div>

			<input
				value={row.key}
				placeholder='Key'
				onChange={(e) => onChange(index, 'key', e.target.value)}
				className='rounded bg-zinc-900 p-2 outline-none'
			/>

			<select
				value={row.type}
				onChange={(e) => onChange(index, 'type', e.target.value)}
				className='rounded bg-zinc-900 p-2 outline-none'>
				<option value='text'>Text</option>
				<option value='file'>File</option>
			</select>

			{row.type === 'file' ? (
				<button
					onClick={async () => {
						const filePath = await window.api.dialog.pickFile();

						if (!filePath) return;

						onChange(index, 'filePath', filePath);
					}}
					className='rounded bg-zinc-800 px-3 py-2'>
					{row.filePath || 'No file selected'}
				</button>
			) : (
				<input
					value={row.value}
					placeholder='Value'
					onChange={(e) => onChange(index, 'value', e.target.value)}
					className='rounded bg-zinc-900 p-2 outline-none'
				/>
			)}
		</div>
	);
}
