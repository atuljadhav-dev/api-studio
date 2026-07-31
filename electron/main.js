import { app } from 'electron';
import { createWindow } from './window.js';
import { connectDatabase } from './database/connect.js';
import { registerIPC } from './ipc/index.js';
import fs from 'node:fs';
import path from 'node:path';
const logFile = path.join(app.getPath('userData'), 'startup.log');

function log(message) {
	fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${message}\n`);
}

process.on('uncaughtException', (err) => {
	log(`Uncaught Exception:\n${err.stack}`);
});

process.on('unhandledRejection', (err) => {
	log(`Unhandled Rejection:\n${err}`);
});
app.whenReady().then(async () => {
	try {
		log('Application is starting...');	
		await connectDatabase();
		registerIPC();
		createWindow();
		log('Application started successfully.');
	} catch (error) {
		console.error('Error during startup:', error);
		log(`Error during startup: ${error.stack}`);
	}
});
