import { createBrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import Error from '@components/Error/Error';
import Home from '@pages/Home/Home';
import Cart from '@pages/Cart/Cart';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			// 홈
			{
				path: '/',
				element: <Home />,
			},
			// 장바구니
			{
				path: '/cart',
				element: <Cart />,
			},
		],
	},
]);

export default router;
