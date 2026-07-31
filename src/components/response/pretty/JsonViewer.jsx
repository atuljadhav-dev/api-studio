import Editor from "@monaco-editor/react";

import useResponseStore from "../../../store/responseStore";

export default function JsonViewer() {
	const { response } = useResponseStore();

	return (
		<Editor
			height='100%'
			language='json'
			theme='vs-dark'
			value={JSON.stringify(response.data, null, 2)}
			options={{
				readOnly: true,
				minimap: {
					enabled: false,
				},
			}}
		/>
	);
}
