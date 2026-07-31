import { BrowserWindow, app } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createWindow() {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});
	if (app.isPackaged) {
		console.log('Loading production build...');
		win.loadFile(path.join(__dirname, '../dist/index.html'));
	} else {
		console.log('Loading development build...');
		win.loadURL('http://localhost:5173');
	}
}
