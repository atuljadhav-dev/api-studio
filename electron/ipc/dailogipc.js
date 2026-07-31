import { ipcMain, dialog } from 'electron';
export function registerDailogIPC() {
	ipcMain.handle('dialog:pickFile', async () => {
		const result = await dialog.showOpenDialog({
			properties: ['openFile'],
		});

		if (result.canceled) return null;

		return result.filePaths[0];
	});
}
