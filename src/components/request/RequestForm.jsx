import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import MethodSelect from "./MethodSelect";
import useRequestStore from "../../store/requestStore";
export default function RequestForm({ onSubmit }) {
	const [name, setName] = useState("");

	const [method, setMethod] = useState("GET");

	const [url, setUrl] = useState("");
	const { requests } = useRequestStore();
	function handleSubmit(e) {
		e.preventDefault();

		if (!name.trim()) return;

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
					{requests.map((request) => (
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
