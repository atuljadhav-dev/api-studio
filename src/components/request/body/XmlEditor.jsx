import Editor from "@monaco-editor/react";

import useRequestStore from "../../../store/requestStore";

export default function XmlEditor() {
	const { selectedRequest, updateRequest } = useRequestStore();

	return (
		<Editor
			height='100%'
			language='xml'
			theme='vs-dark'
			value={selectedRequest.body?.content || ""}
			onChange={(value) =>
				updateRequest(selectedRequest._id, {
					body: {
						...selectedRequest.body,
						content: value,
					},
				})
			}
		/>
	);
}
