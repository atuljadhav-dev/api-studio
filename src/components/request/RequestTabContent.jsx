import AuthTab from "./auth/AuthTab.jsx";
import BodyTab from "./body/BodyTab.jsx";
import CookiesTab from "./cookies/CookiesTab.jsx";
import HeadersTab from "./headers/HeadersTab.jsx";
import ParamsTab from "./params/ParamsTab.jsx";
export default function RequestTabContent({ tab }) {
	switch (tab) {
		case "Params":
			return <ParamsTab />;

		case "Headers":
			return <HeadersTab />;

		case "Auth":
			return <AuthTab />;

		case "Cookies":
			return <CookiesTab />;

		case "Body":
			return <BodyTab />;

		default:
			return null;
	}
}
