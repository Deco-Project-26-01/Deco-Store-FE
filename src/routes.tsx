import Error from '@components/Error/Error';
import Layout from '@components/Layout/Layout';
import { MYPAGE_SIBLINGS } from '@constants/siblings';
import Cart from '@pages/Cart/Cart';
import Home from '@pages/Home/Home';
import Account from '@pages/Mypage/Account';
import MyPage from '@pages/Mypage/Mypage';
import Order from '@pages/Mypage/Order';
import Orders from '@pages/Mypage/Orders';
import Support from '@pages/Mypage/Support';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		handle: { label: 'Home' },
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
				handle: { label: 'Cart' },
			},
			// 마이페이지
			{
				path: 'mypage',
				handle: { label: 'My Page' },
				children: [
					{
						index: true,
						element: <MyPage />,
					},
					{
						path: 'account',
						element: <Account />,
						handle: {
							label: 'Account',
							siblings: MYPAGE_SIBLINGS,
						},
					},
					{
						path: 'order',
						element: <Orders />,
						handle: {
							label: 'Orders',
							siblings: MYPAGE_SIBLINGS,
						},
						children: [
							{
								path: ':id',
								element: <Order />,
								handle: { label: 'Order' },
							},
						],
					},
					{
						path: 'support',
						element: <Support />,
						handle: {
							label: 'Support',
							siblings: MYPAGE_SIBLINGS,
						},
					},
				],
			},
		],
	},
]);

export default router;
