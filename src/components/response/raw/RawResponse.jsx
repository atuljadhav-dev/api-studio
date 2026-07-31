import Editor from "@monaco-editor/react";

import useResponseStore from "../../../store/responseStore";

export default function RawResponse() {
	const { response } = useResponseStore();

	return (
		<Editor
			height='100%'
			language='text'
			theme='vs-dark'
			value={JSON.stringify(response.data)}
			options={{
				readOnly: true,
				minimap: {
					enabled: false,
				},
			}}
		/>
	);
}
