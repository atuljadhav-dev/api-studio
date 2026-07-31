import useRequestStore from "../../store/requestStore";
import useResponseStore from "../../store/responseStore";

export default function SendButton() {
	const { selectedRequest } = useRequestStore();

	const { sendRequest, loading } = useResponseStore();

	return (
		<button
			onClick={() => sendRequest(selectedRequest)}
			disabled={loading}
			className='rounded bg-blue-600 px-5 py-2 hover:bg-blue-700 disabled:opacity-50'>
			{loading ? "Sending..." : "Send"}
		</button>
	);
}
