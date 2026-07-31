import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Collection name is required"],
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		isFavorite: {
			type: Boolean,
			default: false,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Collection", collectionSchema);
