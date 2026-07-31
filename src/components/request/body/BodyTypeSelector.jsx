const bodyTypes = [
	{ label: "None", value: "none" },
	{ label: "Raw", value: "raw" },
	{ label: "Form Data", value: "form-data" },
	{ label: "x-www-form-urlencoded", value: "urlencoded" },
	{ label: "Binary", value: "binary" },
	{ label: "GraphQL", value: "graphql" },
];

export default function BodyTypeSelector({ value, onChange }) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className='rounded border border-zinc-700 bg-zinc-900 px-3 py-2'>
			{bodyTypes.map((item) => (
				<option key={item.value} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
}
