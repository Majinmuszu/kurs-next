import { randomImageId } from "@/helpers/randomImage";
import { ProductItemType } from "@/types/product";
import ProductCardImage from "@/ui/atoms/ProductCardImage";
import ProductCardInfo from "@/ui/atoms/ProductCardInfo";
import React from "react";

const ProductCard = ({ product }: { product: ProductItemType }) => {
	return (
		<li>
			<article className="transform cursor-pointer rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
				<ProductCardImage
					src={`https://picsum.photos/id/${randomImageId()}/400`}
					alt={product.name}
				/>
				<ProductCardInfo {...product} category="Random category" />
			</article>
		</li>
	);
};

export default ProductCard;
