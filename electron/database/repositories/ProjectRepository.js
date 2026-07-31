import Project from "../models/Project.js";
import { serialize, serializeMany } from "../../utils/serialize.js";
import CollectionRepository from "./CollectionRepository.js";
class ProjectRepository {
	async create(data) {
		const project = await Project.create(data);
		return serialize(project);
	}

	async findAll() {
		const projects = await Project.find();
		return serializeMany(projects);
	}

	async findById(id) {
		const project = await Project.findById(id);

		if (!project) return null;

		return serialize(project);
	}

	async update(id, data) {
		const project = await Project.findByIdAndUpdate(id, data, {
			returnDocument: "after",
		});

		if (!project) return null;

		return serialize(project);
	}

	async delete(id) {
		await CollectionRepository.deleteByProject(id);
		await Project.findByIdAndDelete(id);
		return true;
	}
}

export default new ProjectRepository();
