import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import AuthProvider from '@/contexts/Auth';
import { ThemeProvider } from './contexts/ThemeProvider';

function App() {
	return (
		<HelmetProvider>
			<AuthProvider>
				<ThemeProvider>
					<RouterProvider router={router}>{router.routes}</RouterProvider>
				</ThemeProvider>
			</AuthProvider>
			<Toaster />
		</HelmetProvider>
	);
}

export default App;
