import useRequestStore from "../../../store/requestStore";

const authTypes = [
	"none",
	"apikey",
	"bearer",
	"basic",
	"digest",
	"jwt",
	"oauth2",
	"aws",
];

export default function AuthTypeSelector() {
	const { selectedRequest, updateRequest } = useRequestStore();

	function handleChange(e) {
		updateRequest(selectedRequest._id, {
			auth: {
				...selectedRequest.auth,
				type: e.target.value,
			},
		});
	}

	return (
		<select
			value={selectedRequest.auth?.type || "none"}
			onChange={handleChange}
			className='rounded bg-zinc-900 border border-zinc-700 px-3 py-2'>
			{authTypes.map((type) => (
				<option key={type} value={type}>
					{type.toUpperCase()}
				</option>
			))}
		</select>
	);
}
