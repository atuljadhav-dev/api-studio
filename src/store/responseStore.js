import { create } from "zustand";

const useResponseStore = create((set) => ({
	response: null,
	loading: false,

	sendRequest: async (request) => {
		set({
			loading: true,
		});

		const result = await window.api.http.execute(request);

		set({
			response: result.data,
			loading: false,
		});
	},
}));

export default useResponseStore;
