import Editor from "@monaco-editor/react";
import useResponseStore from "../../../store/responseStore";

export default function XmlViewer() {
	const { response } = useResponseStore();

	return (
		<Editor
			height='100%'
			language='xml'
			theme='vs-dark'
			value={typeof response.data === "string" ? response.data : String(response.data)}
			options={{
				readOnly: true,
				minimap: {
					enabled: false,
				},
			}}
		/>
	);
}