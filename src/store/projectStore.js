import { toast } from "react-toastify";
import { create } from "zustand";

const useProjectStore = create((set) => ({
	projects: [],

	selectedProject: null,

	loadProjects: async (collectionId) => {
		const result = await window.api.project.getAll();

		if (result.success) {
			set({
				projects: result.data,
			});
		}
	},

	createProject: async (data) => {
		const result = await window.api.project.create(data);

		if (result.success) {
			set((state) => ({
				projects: [...state.projects, result.data],
				selectedProject: result.data,
			}));
		}else {
			toast.error(result.message);
		}
	},

	updateProject: async (id, data) => {
		const result = await window.api.project.update(id, data);

		if (result.success) {
			set((state) => ({
				projects: state.projects.map((project) =>
					project._id === id ? result.data : project,
				),
			}));
		}
	},

	deleteProject: async (id) => {
		const result = await window.api.project.delete(id);

		if (result.success) {
			set((state) => ({
				projects: state.projects.filter(
					(project) => project._id !== id,
				),
			}));
		}
	},

	selectProject: (project) => {
		set({
			selectedProject: project,
		});
	},
}));

export default useProjectStore;
