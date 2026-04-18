import { useNavigate } from 'react-router-dom';

interface IProductLinkProps {
	id: number;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	isAuthorized: boolean;
}

const ProductLink = ({
	id,
	name,
	description,
	price,
	imageUrl,
	isAuthorized,
}: IProductLinkProps) => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={() => navigate(`/products/${id}`)}
			className={`
        flex flex-col gap-md
      `}
		>
			<img
				src={imageUrl}
				alt={name}
				className={`w-full p-lg aspect-square object-contain rounded-md border border-solid border-base500`}
			/>
			<span className="flex items-center gap-sm justify-between px-sm">
				<span className={`flex flex-col gap-sm`}>
					<span className="text-titleMedium w-[15rem] ellipsis">{name}</span>
					<span className="text-bodyCaption text-base500 w-[15rem] ellipsis">
						{description}
					</span>
				</span>
				{isAuthorized && (
					<span className="text-titleBase text-primaryDark">$ {price}.00</span>
				)}
			</span>
		</button>
	);
};

export default ProductLink;
