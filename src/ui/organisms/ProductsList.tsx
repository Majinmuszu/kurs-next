import React from "react";
import { type ProductsGetListQuery } from "@/gql/graphql";
import { ProductCard } from "@/ui/molecules/ProductCard";

type ProductsListProps = {
	products: ProductsGetListQuery;
};

const ProductsList = async ({ products }: ProductsListProps) => {
	const data = products.products.data;
	return (
		<ul
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
			data-testid="products-list"
		>
			{data.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</ul>
	);
};

export { ProductsList };
