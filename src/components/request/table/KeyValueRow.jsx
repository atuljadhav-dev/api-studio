import { Trash2 } from "lucide-react";

export default function KeyValueRow({ row, index, onChange, deleteRow }) {
	return (
		<div className='grid grid-cols-[80px_1fr_1fr_60px] gap-3 border-b border-zinc-800 px-4 py-2'>
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
				onChange={(e) => onChange(index, 'key', e.target.value)}
				placeholder='Key'
				className='rounded bg-zinc-900 p-2 outline-none'
			/>
			<input
				value={row.value}
				onChange={(e) => onChange(index, 'value', e.target.value)}
				placeholder='Value'
				className='rounded bg-zinc-900 p-2 outline-none'
			/>
			<button
				onClick={() => deleteRow(index)}
				className='rounded bg-red-600 px-1 py-1 flex items-center justify-center text-sm text-white hover:bg-red-700'>
				<Trash2	size={16} />
			</button>
		</div>
	);
}
