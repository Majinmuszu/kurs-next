import React from "react";

const ProductCardInfo = ({
	title,
	price,
	category,
	rating = 0,
}: {
	title: string;
	price: number;
	category: string;
	rating?: number | null;
}) => {
	return (
		<div>
			<div className="mb-2">
				<h3 className="text-lg font-bold">{title}</h3>
				<p className="text-base text-gray-700">
					Rating:{" "}
					<i className="hidden" data-testid="product-rating">
						{rating ? rating.toFixed(2) : "0"}{" "}
					</i>
					<span className="text-yellow-500 shadow-sm">
						{"★".repeat(Math.round(rating || 0))}
						{"☆".repeat(5 - Math.round(rating || 0))}
					</span>
				</p>
				<p className="text-gray-600" data-testid="product-price">
					{price / 100} zł
				</p>
			</div>
			<p className="text-sm text-gray-500">{category}</p>
		</div>
	);
};

export { ProductCardInfo };
