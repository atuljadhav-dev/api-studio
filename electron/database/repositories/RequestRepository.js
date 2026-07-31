import Request from "../models/Request.js";
import { serialize, serializeMany } from "../../utils/serialize.js";
class RequestRepository {
	async create(data) {
		const request = await Request.create(data);
		return serialize(request);
	}
	async findAll() {
		const requests = await Request.find().lean();
		return serializeMany(requests);
	}
	async findByCollection(collectionId, projectId = null) {
		const query = { collectionId };

		if (projectId !== null) {
			query.projectId = projectId;
		}

		const requests = await Request.find(query)
			.sort({ createdAt: 1 })
			.lean();
		return serializeMany(requests);
	}

	async findById(id) {
		const request = await Request.findById(id).lean();
		return serialize(request);
	}

	async update(id, data) {
		const request = await Request.findByIdAndUpdate(id, data, {
			returnDocument: "after",
		}).lean();
		return serialize(request);
	}

	async delete(id) {
		const request = await Request.findByIdAndDelete(id);
		return serialize(request);
	}

	async deleteByCollection(collectionId) {
		const requests = await Request.deleteMany({ collectionId });
		return true;
	}
	async deleteByProject(projectId) {
		const requests = await Request.deleteMany({ projectId });
		return null;
	}
}

export default new RequestRepository();
