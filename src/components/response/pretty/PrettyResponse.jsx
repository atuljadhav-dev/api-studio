import useResponseStore from "../../../store/responseStore";

import JsonViewer from "./JsonViewer";
import XmlViewer from "./XmlViewer";
import HtmlViewer from "./HtmlViewer";

export default function PrettyResponse() {
	const { response } = useResponseStore();
	const contentType = response.headers?.["content-type"] || "";

	if (contentType.includes("application/json")) {
		return <JsonViewer />;
	}

	if (contentType.includes("xml")) {
		return <XmlViewer />;
	}

	if (contentType.includes("text/html")) {
		return <HtmlViewer />;
	}

	return <pre className='overflow-auto p-5'>{String(response.data)}</pre>;
}
