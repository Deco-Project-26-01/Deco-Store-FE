import iconCheckWhite from '@assets/icons/icon-check-white.svg';

const CheckboxInput = ({
	id,
	children,
	...rest
}: {
	id: string;
	children: React.ReactNode;
}) => {
	return (
		<label htmlFor={id} className="inline-flex items-center gap-md">
			<input type="checkbox" id={id} className="peer sr-only" {...rest} />
			<span
				className={`
            flex justify-center items-center
            w-lg h-lg
            rounded-xs
            cursor-pointer
            border border-solid box-border border-base500
            peer-checked:bg-primaryDark peer-checked:border-none
          `}
				aria-hidden="true"
			>
				<img src={iconCheckWhite} alt="" className="w-[10px]" />
			</span>
			{children}
		</label>
	);
};

export default CheckboxInput;
