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
        flex flex-col gap-sm
      `}
		>
			<img src={imageUrl} alt={name} className={`w-full aspect-square`} />
			<span className="flex items-center gap-sm justify-between">
				<span className={`flex flex-col gap-sm`}>
					<span className="text-titleMedium w-[20rem] ellipsis">{name}</span>
					<span className="text-bodyCaption text-base500 w-[20rem] ellipsis">
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
