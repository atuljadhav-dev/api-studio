import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MethodSelect from "./MethodSelect";
import useRequestStore from "../../store/requestStore";
import useProjectStore from "../../store/projectStore";
import { toast } from "react-toastify";
export default function RequestForm({ onSubmit }) {
	const [name, setName] = useState("");

	const [method, setMethod] = useState("GET");

	const [url, setUrl] = useState("");
	const { requests } = useRequestStore();
	const { selectedProject } = useProjectStore();
	const [filteredRequests, setFilteredRequests] = useState(requests);
	useEffect(() => {
		let filtered = requests.filter(
			(request) => request.projectId === selectedProject?._id,
		);
		setFilteredRequests(
			filtered.length > 0
				? filtered
				: [
						{ url: "http://localhost:3000", _id: "1" },
						{ url: "http://localhost:3001", _id: "2" },
						{ url: "http://localhost:3002", _id: "3" },
						{ url: "http://localhost:5000", _id: "4" },
						{ url: "http://localhost:5001", _id: "5" },
						{ url: "http://localhost:5002", _id: "6" },
						{ url: "http://localhost:8000", _id: "7" },
						{ url: "http://localhost:8001", _id: "8" },
						{ url: "http://localhost:8002", _id: "9" },
					],
		);
	}, [selectedProject]);
	function handleSubmit(e) {
		e.preventDefault();

		if (!name.trim()) {
			toast.error("Name is required");
			return;
		}

		onSubmit({
			name,
			method,
			url,

			params: [],

			headers: [],

			cookies: [],

			body: {
				type: "none",
				format: "json",
				content: "",
				formData: [],
				urlEncoded: [],
				binary: { filePath: "" },
				graphql: { query: "", variables: "{}" },
			},

			auth: {
				type: "none",
				apiKey: { key: "", value: "", addTo: "header" },
				bearer: { token: "" },
				basic: { username: "", password: "" },
				digest: { username: "", password: "" },
				jwt: { token: "" },
				oauth2: {
					accessToken: "",
					refreshToken: "",
					clientId: "",
					clientSecret: "",
					tokenUrl: "",
					scopes: "",
				},
				aws: { accessKey: "", secretKey: "", region: "", service: "" },
			},
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-5">
			<div>
				<label className="mb-2 block text-sm">Name</label>

				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Get Users"
				/>
			</div>

			<div>
				<label className="mb-2 block text-sm">Method</label>

				<MethodSelect
					value={method}
					onChange={setMethod}
				/>
			</div>

			<div>
				<label className="mb-2 block text-sm">URL</label>

				<Input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="https://api.example.com/users"
					list="url-suggestions"
				/>
				<datalist id="url-suggestions">
					{filteredRequests.map((request) => (
						<option
							key={request._id}
							value={request.url}
						/>
					))}
				</datalist>
			</div>

			<div className="flex justify-end">
				<Button type="submit">Create Request</Button>
			</div>
		</form>
	);
}
