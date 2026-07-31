import useResponseStore from "../../../store/responseStore";

export default function ResponseCookies() {
	const { response } = useResponseStore();
	const setCookieHeader = response.headers?.["set-cookie"];

	const cookieEntries = Array.isArray(setCookieHeader)
		? setCookieHeader
		: setCookieHeader
			? [setCookieHeader]
			: [];

	if (!cookieEntries.length) {
		return (
			<div className='p-5 text-zinc-500'>No cookies were returned in this response.</div>
		);
	}

	return (
		<div className='overflow-auto p-5'>
			<table className='w-full'>
				<thead>
					<tr className='border-b border-zinc-800 text-left text-zinc-400'>
						<th className='py-2 font-medium'>Cookie</th>
						<th className='py-2 font-medium'>Attributes</th>
					</tr>
				</thead>
				<tbody>
					{cookieEntries.map((cookieLine, index) => {
						const [nameValue, ...attributes] = String(cookieLine).split(";");
						return (
							<tr
								key={`${nameValue}-${index}`}
								className='border-b border-zinc-800 align-top'>
								<td className='py-3 font-semibold'>{nameValue.trim()}</td>
								<td className='py-3 text-zinc-300'>
									{attributes.length ? attributes.join("; ").trim() : "-"}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}