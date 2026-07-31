import { ipcMain } from "electron";
import collectionRepository from "../database/repositories/CollectionRepository.js";
import { success, failure } from "../utils/ipcResponse.js";

export function registerCollectionIPC() {
	ipcMain.handle("collection:create", async (_, data) => {
		try {
			const collection = await collectionRepository.create(data);
			return success(collection, "Collection created");
		} catch (error) {
			if (error.code === 11000) {
				return failure("Collection already exists");
			}
			return failure(error.message);
		}
	});

	ipcMain.handle("collection:getAll", async () => {
		try {
			const collections = await collectionRepository.findAll();
			return success(collections);
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("collection:getById", async (_, id) => {
		try {
			const collection = await collectionRepository.findById(id);
			if (!collection) {
				return failure("Collection not found");
			}
			return success(collection);
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("collection:update", async (_, id, data) => {
		try {
			const updatedCollection = await collectionRepository.update(
				id,
				data,
			);
			if (!updatedCollection) {
				return failure("Collection not found");
			}
			return success(updatedCollection, "Collection updated");
		} catch (error) {
			return failure(error.message);
		}
	});
	ipcMain.handle("collection:delete", async (_, id) => {
		try {
			const deleted = await collectionRepository.delete(id);
			if (!deleted) {
				return failure("Collection not found");
			}
			return success(null, "Collection deleted");
		} catch (error) {
			return failure(error.message);
		}
	});
	ipcMain.handle("collection:deleteProject", async (_, id) => {
		try {
			const deleted = await collectionRepository.deleteByProject(id);
			if (!deleted) {
				return failure("Collection not found");
			}
			return success(null, "Collection deleted");
		} catch (error) {
			return failure(error.message);
		}
	});
}
