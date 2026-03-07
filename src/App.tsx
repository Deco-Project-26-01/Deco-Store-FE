import router from '@/routes';
import ModalHost from '@components/Modal/ModalHost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
				<ModalHost />
			</Suspense>
		</QueryClientProvider>
	);
}

export default App;
