import { create } from 'zustand';
import useRequestStore from './requestStore';
import { toast } from 'react-toastify';
const STORAGE_KEY = 'workspace';

function saveWorkspace(tabs, activeTabId) {
	localStorage.setItem(
		'workspace',
		JSON.stringify({
			activeTabId,
			tabs: tabs.map((tab) => ({ id: tab.id, requestId: tab.requestId })),
		}),
	);
}
const useWorkspaceStore = create((set, get) => ({
	tabs: [],

	activeTabId: null,

	openRequest(request) {
		const exists = get().tabs.find((tab) => tab.requestId === request._id);
		if (exists) {
			set({ activeTabId: exists.id });

			return;
		}
		const tab = {
			id: crypto.randomUUID(),

			requestId: request._id,

			name: request.name,

			method: request.method,

			request,
		};

		set((state) => {
			const next = { tabs: [...state.tabs, tab], activeTabId: tab.id };

			saveWorkspace(next.tabs, next.activeTabId);

			return next;
		});
	},

	closeTab(tabId) {
		const currentTabs = get().tabs;
		const closingIndex = currentTabs.findIndex((tab) => tab.id === tabId);
		const tabs = currentTabs.filter((tab) => tab.id !== tabId);

		let active = get().activeTabId;

		if (active === tabId) {
			if (!tabs.length) {
				active = null;
			} else {
				const fallbackIndex = Math.max(0, closingIndex - 1);
				active = tabs[fallbackIndex]?.id ?? tabs[tabs.length - 1].id;
			}
		}
		saveWorkspace(tabs, active);
		set({
			tabs,

			activeTabId: active,
		});
		return active;
	},

	selectTab(tabId) {
		set((state) => {
			saveWorkspace(state.tabs, tabId);

			return { activeTabId: tabId };
		});
	},

	updateTab(requestId, request) {
		set((state) => {
			const tabs = state.tabs.map((tab) =>
				tab.requestId === requestId
					? {
							...tab,
							request,
							name: request.name || 'New Request',
							method: request.method,
						}
					: tab,
			);

			saveWorkspace(tabs, state.activeTabId);

			return { tabs };
		});
	},
	restoreWorkspace: async () => {
		const saved = JSON.parse(localStorage.getItem('workspace'));

		if (!saved || !saved.tabs?.length) return;

		const tabs = [];
		for (const tab of saved.tabs) {
			try {
				let request = await window.api.request.getById(tab.requestId);
				request = request.success ? request.data : null;
				if (!request) continue;

				tabs.push({
					id: tab.id,
					requestId: request._id,
					name: request.name,
					method: request.method,
					request,
				});
			} catch (err) {
				toast.error('Failed to restore tab:', err);
			}
		}
		const activeTabId =
			tabs.find((tab) => tab.id === saved.activeTabId)?.id ?? null;
		set({ tabs, activeTabId });
		if (activeTabId) {
			const activeTab = tabs.find((tab) => tab.id === activeTabId);
			if (activeTab)
				useRequestStore.getState().selectRequest(activeTab.request);
		}
	},
}));

export default useWorkspaceStore;
