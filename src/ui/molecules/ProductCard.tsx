import { ProductListItemType } from "@/types/product";
import ProductCardImage from "@/ui/atoms/ProductCardImage";
import ProductCardInfo from "@/ui/atoms/ProductCardInfo";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductListItemType }) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article className="transform rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
					<ProductCardImage src={product.images[0].url} alt={product.images[0].alt} />
					<ProductCardInfo
						category={product.categories[0].name}
						title={product.name}
						price={product.price}
					/>
				</article>
			</Link>
		</li>
	);
};

export default ProductCard;
