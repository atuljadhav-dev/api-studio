import { ipcMain } from "electron";
import RequestRepository from "../database/repositories/RequestRepository.js";
import { success, failure } from "../utils/ipcResponse.js";

export function registerRequestIPC() {
	ipcMain.handle("request:create", async (_, data) => {
		try {
			const request = await RequestRepository.create(data);

			return success(request, "Request created");
		} catch (error) {
			if (error.code === 11000) {
				return failure("Request already exists");
			}

			return failure(error.message);
		}
	});
	ipcMain.handle("request:getAll", async () => {
		try {
			const requests = await RequestRepository.findAll();
			return success(requests);
		} catch (error) {
			return failure(error.message);
		}
	});
	ipcMain.handle(
		"request:getByCollection",
		async (_, collectionId, projectId = null) => {
			try {
				const requests = await RequestRepository.findByCollection(
					collectionId,
					projectId,
				);
				return success(requests);
			} catch (error) {
				return failure(error.message);
			}
		},
	);

	ipcMain.handle("request:getById", async (_, id) => {
		try {
			const request = await RequestRepository.findById(id);

			return success(request);
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("request:update", async (_, id, data) => {
		try {
			const request = await RequestRepository.update(id, data);
			return success(request, "Updated");
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("request:delete", async (_, id) => {
		try {
			await RequestRepository.delete(id);

			return success(null, "Deleted");
		} catch (error) {
			return failure(error.message);
		}
	});
}
