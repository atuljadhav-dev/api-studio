import { ipcMain } from "electron";
import projectRepository from "../database/repositories/ProjectRepository.js";
import { success, failure } from "../utils/ipcResponse.js";
export function registerProjectIPC() {
	ipcMain.handle("project:create", async (_, data) => {
		try {
			const project = await projectRepository.create(data);
			return success(project);
		} catch (error) {
			if (error.code === 11000) {
				return failure("Project already exists");
			}
			return failure(error.message);
		}
	});
	ipcMain.handle("project:getAll", async () => {
		try {
			const projects = await projectRepository.findAll();
			return success(projects);
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("project:update", async (_, id, data) => {
		try {
			const project = await projectRepository.update(id, data);
			return success(project);
		} catch (error) {
			return failure(error.message);
		}
	});

	ipcMain.handle("project:delete", async (_, id) => {
		try {
			await projectRepository.delete(id);
			return success(null, "Project deleted");
		} catch (error) {
			return failure(error.message);
		}
	});
}
