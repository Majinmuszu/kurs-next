import { ProductItemType } from "@/types/product";
import ProductCardImage from "@/ui/atoms/ProductCardImage";
import ProductCardInfo from "@/ui/atoms/ProductCardInfo";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductItemType }) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article className="transform rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
					<ProductCardImage src={product.image} alt={product.title} />
					<ProductCardInfo {...product} category="Random category" />
				</article>
			</Link>
		</li>
	);
};

export default ProductCard;
