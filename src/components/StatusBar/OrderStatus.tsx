type OrderStatusType =
	| 'PENDING'
	| 'PREPARING'
	| 'SHIPPED'
	| 'IN_TRANSIT'
	| 'DELIVERED'
	| 'CANCELLED'
	| 'REFUNDED';

const orderStatusOptions = [
	{ label: 'Pending', value: 'PENDING' },
	{ label: 'Preparing', value: 'PREPARING' },
	{ label: 'Shipped', value: 'SHIPPED' },
	{ label: 'Out for Delivery', value: 'IN_TRANSIT' },
	{ label: 'Delivered', value: 'DELIVERED' },
];

interface IOrderStatusProps {
	status: OrderStatusType;
}

const OrderStatus = ({ status }: IOrderStatusProps) => {
	if (status === 'CANCELLED') {
		return (
			<div>
				<p className="text-titleMedium text-alert">
					This order has been cancelled.
				</p>
			</div>
		);
	} else if (status === 'REFUNDED') {
		return (
			<div>
				<p className="text-titleMedium text-alert">
					This order has been refunded.
				</p>
			</div>
		);
	}

	const currentIndex = orderStatusOptions.findIndex(
		(step) => step.value === status,
	);

	const progressRatio = currentIndex / (orderStatusOptions.length - 1);

	return (
		<div className="w-full">
			<ol
				className="
					order-status-progress
					relative flex justify-between
					
					before:content-['']
					before:absolute
					before:left-[1.9rem]
					before:right-[1.9rem]
					before:bottom-[1.9rem]
					before:h-[2px]

					after:content-['']
					after:absolute
					after:left-[1.9rem]
					after:bottom-[1.9rem]
					after:h-[2px]
					after:w-[var(--progress-width)]
				"
				style={
					{
						'--progress-width': `calc((100% - 6.7rem) * ${progressRatio})`,
					} as React.CSSProperties
				}
			>
				{orderStatusOptions.map((step, index) => {
					const isActive = index <= currentIndex;
					return (
						<li
							key={step.value}
							className="flex flex-col gap-sm items-center relative z-10"
						>
							<p
								className={`text-bodyBase ${
									isActive ? 'text-primaryDark' : 'text-base500'
								}`}
							>
								{step.label}
							</p>
							<div
								className={`
									w-[3.8rem] h-[3.8rem] rounded-full flex items-center justify-center
									text-white text-titleMedium shrink-0
									${isActive ? 'bg-primaryDark' : 'bg-base500'}
								`}
							>
								{index + 1}
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default OrderStatus;
