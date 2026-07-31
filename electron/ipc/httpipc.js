import { ipcMain } from "electron";
import httpService from "../services/httpService.js";

export function registerHttpIPC() {
	ipcMain.handle("http:execute", async (_, request) => {
		return await httpService.execute(request);
	});
}
