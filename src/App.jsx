import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
	return (
		<>
			<HelmetProvider>
				<RouterProvider router={router} />
			</HelmetProvider>
			<Toaster />
		</>
	);
}

export default App;
