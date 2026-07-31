import { useEffect } from 'react';
import useWorkspaceStore from './store/workspaceStore';
import AppLayout from './components/layout/AppLayout';

const App = () => {
	const { restoreWorkspace } = useWorkspaceStore();
	useEffect(() => {
		restoreWorkspace();
	}, []);
	return <AppLayout />;
};

export default App;
