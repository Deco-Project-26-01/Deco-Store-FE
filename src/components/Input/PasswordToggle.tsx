import IconButton from '@components/Button/IconButton';

interface IPasswordToggleProps {
	iconPath: string;
	iconAlt: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PasswordToggle = ({
	iconPath,
	iconAlt,
	onClick,
}: IPasswordToggleProps) => {
	return (
		<div
			className={`
        ml-auto
        w-[2.4rem] h-[2.4rem] p-xs
        duration
        flex items-center justify-center
        hover:scale-95 hover:rounded-xs hover:bg-base300/10
        focus-within:rounded-xs focus-within:outline focus-within:outline-1 focus-within:outline-base300
        active:scale-95 active:rounded-xs active:bg-base300/10
      `}
		>
			<IconButton iconPath={iconPath} iconAlt={iconAlt} onClick={onClick} />
		</div>
	);
};

export default PasswordToggle;
