import Link from "next/link";
import React from "react";
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductCardImage } from "@/ui/atoms/ProductCardImage";
import { ProductCardInfo } from "@/ui/atoms/ProductCardInfo";

const ProductCard = ({ product }: { product: ProductListItemFragment }) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article className="transform rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
					<ProductCardImage src={product.images[0].url} alt={product.images[0].alt} />
					<ProductCardInfo
						category={product.categories[0].name}
						title={product.name}
						price={product.price}
						rating={product.rating}
					/>
				</article>
			</Link>
		</li>
	);
};

export { ProductCard };
