export function serialize(document) {
	if (!document) return null;

	const obj =
		typeof document.toObject === "function"
			? document.toObject()
			: { ...document };

	if (obj._id) {
		obj._id = obj._id.toString();
	}

	if (obj.collectionId) {
		obj.collectionId = obj.collectionId.toString();
	}

	if (obj.projectId) {
		obj.projectId = obj.projectId.toString();
	}
	if (obj.projectIds){
		
	}
	if (obj.requestIds){
		
	}
	return obj;
}

export function serializeMany(documents) {
	return documents.map(serialize);
}
