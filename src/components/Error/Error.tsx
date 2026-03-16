import TextButton from '@components/Button/TextButton';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';

const Error = () => {
	const navigate = useNavigate();
	const clearTokens = useUserStore((state) => state.clearTokens);

	const handleClick = () => {
		clearTokens();
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
