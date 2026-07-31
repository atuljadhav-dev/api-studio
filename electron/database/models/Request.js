import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
	{
		collectionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Collection",
			required: true,
			index: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			default: null,
		},

		method: {
			type: String,
			enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
			default: "GET",
		},

		url: {
			type: String,
			default: "",
		},

		headers: [
			{
				key: {
					type: String,
					default: "",
				},

				value: {
					type: String,
					default: "",
				},

				enabled: {
					type: Boolean,
					default: true,
				},
			},
		],

		cookies: [
			{
				key: {
					type: String,
					default: "",
				},

				value: {
					type: String,
					default: "",
				},

				enabled: {
					type: Boolean,
					default: true,
				},
			},
		],

		params: [
			{
				key: {
					type: String,
					default: "",
				},

				value: {
					type: String,
					default: "",
				},

				enabled: {
					type: Boolean,
					default: true,
				},
			},
		],

		body: {
			type: Object,
			default: {},
		},
		auth: {
			type: Object,

			apiKey: {
				key: "",
				value: "",
				addTo: "header",
			},

			bearer: {
				token: "",
			},

			basic: {
				username: "",
				password: "",
			},

			oauth2: {
				accessToken: "",
				refreshToken: "",
				clientId: "",
				clientSecret: "",
				tokenUrl: "",
				scopes: "",
			},

			digest: {
				username: "",
				password: "",
			},

			jwt: {
				token: "",
			},

			aws: {
				accessKey: "",
				secretKey: "",
				region: "",
				service: "",
			},
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Request", requestSchema);
