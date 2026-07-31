import PrettyResponse from "./pretty/PrettyResponse";
import RawResponse from "./raw/RawResponse";
import ResponseHeaders from "./headers/ResponseHeaders";
import ResponseCookies from "./cookies/ResponseCookies";
import PreviewResponse from "./preview/PreviewResponse";

export default function ResponseContent({ tab }) {
	switch (tab) {
		case "Pretty":
			return <PrettyResponse />;

		case "Raw":
			return <RawResponse />;

		case "Headers":
			return <ResponseHeaders />;

		case "Cookies":
			return <ResponseCookies />;

		case "Preview":
			return <PreviewResponse />;

		default:
			return null;
	}
}
