import { createBrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import Error from '@components/Error/Error';
import Home from '@pages/Home/Home';
import Cart from '@pages/Cart/Cart';
import MyPage from '@pages/Mypage/Mypage';
import Support from '@pages/Mypage/Support';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			// 홈
			{
				index: true,
				element: <Home />,
			},
			// 장바구니
			{
				path: 'cart',
				element: <Cart />,
			},
			// 마이페이지
			{
				path: 'mypage',

				children: [
					{
						index: true,
						element: <MyPage />,
					},
					{
						path: 'support',
						element: <Support />,
					},
				],
			},
		],
	},
]);

export default router;
