import useRequestStore from "../../../store/requestStore";

import JsonEditor from "./JsonEditor";
import XmlEditor from "./XmlEditor";
import TextEditor from "./TextEditor";
import HtmlEditor from "./HtmlEditor";

export default function RawBody() {
	const { selectedRequest, updateRequest } = useRequestStore();
	const format = selectedRequest.body?.format || "json";

	function setFormat(nextFormat) {
		updateRequest(selectedRequest._id, {
			body: {
				...selectedRequest.body,
				format: nextFormat,
			},
		});
	}

	return (
		<div className='flex h-full flex-col'>
			<div className='border-b border-zinc-800 p-3'>
				<select
					value={format}
					onChange={(e) => setFormat(e.target.value)}
					className='rounded bg-zinc-900 px-3 py-2'>
					<option value='json'>JSON</option>

					<option value='xml'>XML</option>

					<option value='text'>Text</option>

					<option value='html'>HTML</option>
				</select>
			</div>

			<div className='flex-1 overflow-hidden'>
				{format === "json" && <JsonEditor />}

				{format === "xml" && <XmlEditor />}

				{format === "text" && <TextEditor />}

				{format === "html" && <HtmlEditor />}
			</div>
		</div>
	);
}
