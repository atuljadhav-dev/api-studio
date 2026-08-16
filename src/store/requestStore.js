import { create } from "zustand";
import useWorkspaceStore from "./workspaceStore";
import { toast } from "react-toastify";

const useRequestStore = create((set, get) => ({
	requests: [],

	selectedRequest: null,

	loading: false,
	requestUpdateTokens: {},

	loadRequests: async () => {
		set({ loading: true });

		const result = await window.api.request.getAll();
		if (result.success) {
			set({
				requests: result.data,
				loading: false,
			});
		} else {
			set({
				requests: [],
				loading: false,
			});
		}
	},

	createRequest: async (request) => {
		const result = await window.api.request.create(request);
		if (result.success) {
			set((state) => ({
				requests: [...state.requests, result.data],
				selectedRequest: result.data,
			}));
			return result.data;
		}else {
			toast.error(result.message);
		}
		return null;
	},

	selectRequest: (request) => {
		set({
			selectedRequest: request,
		});
	},

	deleteRequest: async (id) => {
		const result = await window.api.request.delete(id);

		if (result.success) {
			set((state) => ({
				requests: state.requests.filter(
					(request) => request._id !== id,
				),

				selectedRequest:
					state.selectedRequest?._id === id
						? null
						: state.selectedRequest,
			}));
		}
	},
	updateRequest: async (id, data) => {
		let optimisticRequest = null;
		set((state) => {
			const requests = state.requests.map((request) => {
				if (request._id !== id) {
					return request;
				}

				optimisticRequest = {
					...request,
					...data,
				};
				return optimisticRequest;
			});

			const selectedRequest =
				state.selectedRequest?._id === id
					? {
							...state.selectedRequest,
							...data,
						}
					: state.selectedRequest;

			if (!optimisticRequest && selectedRequest?._id === id) {
				optimisticRequest = selectedRequest;
			}

			return {
				requests,
				selectedRequest,
				requestUpdateTokens: {
					...state.requestUpdateTokens,
					[id]: (state.requestUpdateTokens[id] || 0) + 1,
				},
			};
		});

		if (!optimisticRequest) {
			return;
		}

		useWorkspaceStore
			.getState()
			.updateTab(optimisticRequest._id, optimisticRequest);

		const token = get().requestUpdateTokens[id];
		const result = await window.api.request.update(id, data);
		if (result.success) {
			if (get().requestUpdateTokens[id] !== token) {
				return;
			}

			useWorkspaceStore
				.getState()
				.updateTab(result.data._id, result.data);
			set((state) => ({
				requests: state.requests.map((request) =>
					request._id === id ? result.data : request,
				),

				selectedRequest:
					state.selectedRequest?._id === id
						? result.data
						: state.selectedRequest,
			}));
		}
	},
}));

export default useRequestStore;
