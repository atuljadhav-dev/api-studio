import Editor from "@monaco-editor/react";
import useResponseStore from "../../../store/responseStore";

export default function HtmlViewer() {
	const { response } = useResponseStore();

	return (
		<Editor
			height='100%'
			language='html'
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
