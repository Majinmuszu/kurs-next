import React from "react";
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductCard } from "@/ui/molecules/ProductCard";

type ProductsListProps = {
	products: ProductListItemFragment[];
};

const ProductsList = async ({ products }: ProductsListProps) => {
	return (
		<ul
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</ul>
	);
};

export { ProductsList };
