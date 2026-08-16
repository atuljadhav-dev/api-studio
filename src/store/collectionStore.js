import { toast } from 'react-toastify';
import { create } from 'zustand';

const useCollectionStore = create((set) => ({
	collections: [],

	loading: false,
	selectedCollection: null,
	loadCollections: async () => {
		set({ loading: true });

		const result = await window.api.collection.getAll();
		if (result.success) {
			set({ collections: result.data, loading: false });
		} else {
			set({ loading: false });
		}
	},
	createCollection: async (projectId, name) => {
		const result = await window.api.collection.create({ projectId, name });
		if (result.success) {
			set((state) => ({
				collections: [...state.collections, result.data],
			}));
		} else {
			toast.error(result.message);
		}
	},
	deleteCollection: async (id) => {
		await window.api.collection.delete(id);
		set((state) => ({
			collections: state.collections.filter((c) => c._id !== id),
		}));
	},
	updateCollection: async (id, name) => {
		const result = await window.api.collection.update(
			id,

			{ name },
		);

		if (result.success) {
			set((state) => ({
				collections: state.collections.map((c) =>
					c._id === id ? result.data : c,
				),
			}));
		}
	},
	selectCollection: async (collection) => {
		set({ selectedCollection: collection });
	},
}));

export default useCollectionStore;
