import React from "react";

const ProductCardInfo = ({
	name,
	price,
	category,
}: {
	name: string;
	price: number;
	category: string;
}) => {
	return (
		<div>
			<div className="mb-2">
				<h3 className="text-lg font-bold">{name}</h3>
				<p className="text-gray-600">{price / 100} zł</p>
			</div>
			<p className="text-sm text-gray-500">{category}</p>
		</div>
	);
};

export default ProductCardInfo;
