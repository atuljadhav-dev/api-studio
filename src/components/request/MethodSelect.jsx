const methods = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS",
];

export default function MethodSelect({
	value,
	onChange,
}) {
	return (
		<select
			value={value}
			onChange={(e) =>
				onChange(e.target.value)
			}
			className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-blue-500"
		>
			{methods.map((method) => (
				<option
					key={method}
					value={method}
				>
					{method}
				</option>
			))}
		</select>
	);
}