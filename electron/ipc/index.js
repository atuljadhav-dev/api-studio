import { registerCollectionIPC } from './collectionipc.js';
import { registerRequestIPC } from './requestipc.js';
import { registerHttpIPC } from './httpipc.js';
import { registerProjectIPC } from './projectipc.js';
import { registerDailogIPC } from './dailogipc.js';

export function registerIPC() {
	registerRequestIPC();
	registerCollectionIPC();
	registerHttpIPC();
	registerProjectIPC();
	registerDailogIPC();
}
