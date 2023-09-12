import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import AuthProvider from '@/contexts/Auth';

function App() {
	return (
		<>
			<HelmetProvider>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</HelmetProvider>
			<Toaster />
		</>
	);
}

export default App;
