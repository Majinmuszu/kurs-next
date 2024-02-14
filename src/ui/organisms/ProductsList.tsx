import { ProductItemType } from "@/types/product";
import ProductCard from "@/ui/molecules/ProductCard";
import React from "react";

type ProductsListProps = {
	products: ProductItemType[];
};

const ProductsList = ({ products }: ProductsListProps) => {
	return (
		<ul
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</ul>
	);
};

export default ProductsList;
