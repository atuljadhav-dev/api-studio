import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Project name is required"],
			trim: true,
			unique: true,
			minlength: 3,
			maxlength: 50,
		},
		isFavorite: {
			type: Boolean,
			default: false,
		},
	},

	{
		timestamps: true,
	},
);

export default mongoose.model("Project", projectSchema);
