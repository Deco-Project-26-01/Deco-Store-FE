import TextButton from '@components/Button/TextButton';
import { useUserStore } from '@store/useUserStore';
import {
	useNavigate,
	useRouteError,
	isRouteErrorResponse,
} from 'react-router-dom';

const Error = () => {
	const navigate = useNavigate();
	const clearTokens = useUserStore((state) => state.clearTokens);
	const error = useRouteError();

	const handleClick = () => {
		if (isRouteErrorResponse(error) && error.status === 401) {
			clearTokens();
		}
		navigate('/');
	};

	return (
		<div>
			Error
			<TextButton variant="dark" size="medium" onClick={handleClick}>
				Go back to home
			</TextButton>
		</div>
	);
};

export default Error;
