import Error from '@components/Error/Error';
import ProtectedRoute from '@components/Guard/ProtectedRoute';
import PublicRoute from '@components/Guard/PublicRoute';
import Layout from '@components/Layout/Layout';
import { MYPAGE_SIBLINGS } from '@constants/siblings';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import Cart from '@pages/Cart/Cart';
import Home from '@pages/Home/Home';
import Account from '@pages/Mypage/Account';
import MyPage from '@pages/Mypage/Mypage';
import Order from '@pages/Mypage/Order/Order';
import OrderLayout from '@pages/Mypage/Order/OrderLayout';
import Orders from '@pages/Mypage/Order/Orders';
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
			// 🔐 로그인 필요 영역
			{
				element: <ProtectedRoute />,
				children: [
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
								element: <OrderLayout />,
								handle: {
									label: 'Orders',
									siblings: MYPAGE_SIBLINGS,
								},
								children: [
									{ index: true, element: <Orders /> },
									{
										path: ':_id',
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
			// 🚫 로그인 상태면 접근 불가 영역
			{
				element: <PublicRoute />,
				children: [
					// 로그인
					{
						path: 'login',
						element: <Login />,
						handle: { label: 'Login' },
					},
					// 회원가입
					{
						path: 'register',
						element: <Register />,
						handle: { label: 'Register' },
					},
				],
			},
		],
	},
]);

export default router;
