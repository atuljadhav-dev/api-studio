import useResponseStore from "../../store/responseStore";

import ResponseToolbar from "./ResponseToolbar";
import ResponseTabs from "./ResponseTabs";

export default function ResponseViewer() {
	const { response } = useResponseStore();

	if (!response) {
		return (
			<div className='flex h-full items-center justify-center bg-zinc-950 text-zinc-500'>
				Send a request to view the response.
			</div>
		);
	}

	return (
		<div className='flex h-full flex-col'>
			<ResponseToolbar />

			<ResponseTabs />
		</div>
	);
}
