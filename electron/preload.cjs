const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	collection: {
		create(data) {
			return ipcRenderer.invoke('collection:create', data);
		},

		getAll() {
			return ipcRenderer.invoke('collection:getAll');
		},

		getById(id) {
			return ipcRenderer.invoke('collection:getById', id);
		},

		update(id, data) {
			return ipcRenderer.invoke('collection:update', id, data);
		},

		delete(id) {
			return ipcRenderer.invoke('collection:delete', id);
		},
	},
	request: {
		create(data) {
			return ipcRenderer.invoke('request:create', data);
		},
		getAll() {
			return ipcRenderer.invoke('request:getAll');
		},

		getByCollection(collectionId, projectId = null) {
			return ipcRenderer.invoke(
				'request:getByCollection',
				collectionId,
				projectId,
			);
		},

		getById(id) {
			return ipcRenderer.invoke('request:getById', id);
		},

		update(id, data) {
			return ipcRenderer.invoke('request:update', id, data);
		},

		delete(id) {
			return ipcRenderer.invoke('request:delete', id);
		},
	},
	http: { execute: (request) => ipcRenderer.invoke('http:execute', request) },
	project: {
		create: (data) => ipcRenderer.invoke('project:create', data),

		update: (id, data) => ipcRenderer.invoke('project:update', id, data),

		delete: (id) => ipcRenderer.invoke('project:delete', id),
		getAll: () => ipcRenderer.invoke('project:getAll'),
	},
	dialog: { pickFile: () => ipcRenderer.invoke('dialog:pickFile') },
});
