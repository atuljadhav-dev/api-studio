import Collection from "../models/Collection.js";
import { serialize, serializeMany } from "../../utils/serialize.js";
import RequestRepository from "./RequestRepository.js";
import ProjectRepository from "./ProjectRepository.js";
class CollectionRepository {
	async create(data) {
		const collection = await Collection.create(data);
		return serialize(collection);
	}

	async findAll() {
		const collections = await Collection.find().sort({
			createdAt: 1,
		});
		return serializeMany(collections);
	}

	async findById(id) {
		const collection = await Collection.findById(id);
		return serialize(collection);
	}

	async update(id, data) {
		const collection = await Collection.findByIdAndUpdate(id, data, {
			returnDocument: "after",
		});
		return serialize(collection);
	}
	async delete(id) {
		const collection = await RequestRepository.deleteByCollection(id);
		const deletedCollection = await Collection.findByIdAndDelete(id);
		return null;
	}
	async deleteByProject(projectId) {
		await RequestRepository.deleteByProject(projectId);
		await Collection.deleteMany({ projectId });
		return null;
	}
}

export default new CollectionRepository();
