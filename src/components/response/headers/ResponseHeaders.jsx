import useResponseStore from "../../../store/responseStore";

export default function ResponseHeaders() {
	const { response } = useResponseStore();

	return (
		<div className='overflow-auto p-5'>
			<table className='w-full'>
				<tbody>
					{Object.entries(response.headers || {}).map(
						([key, value]) => (
							<tr key={key} className='border-b border-zinc-800'>
								<td className='py-2 font-semibold'>{key}</td>

								<td>{String(value)}</td>
							</tr>
						),
					)}
				</tbody>
			</table>
		</div>
	);
}
