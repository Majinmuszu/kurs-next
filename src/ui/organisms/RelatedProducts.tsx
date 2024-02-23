import React from "react";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import {
	CategoryGetProductsListDocument,
	CollectionGetProductsListDocument,
	type ProductListItemFragment,
	ProductsGetListDocument,
	ProductGetItemByIdDocument,
} from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";
type RelatedProductsProps = {
	productId: string;
};
const RelatedProducts = async ({ productId }: RelatedProductsProps) => {
	const { product } = await executeGraphql(ProductGetItemByIdDocument, { id: productId });
	if (!product) {
		throw notFound();
	}
	const categorySlug = product.categories[0] ? product.categories[0].slug : null;
	const collectionSlug = product.collections[0] ? product.collections[0].slug : null;
	let relatedProducts: ProductListItemFragment[] = [];
	if (categorySlug) {
		const { category } = await executeGraphql(CategoryGetProductsListDocument, {
			slug: categorySlug,
		});
		if (category && category.products.length > 1) {
			relatedProducts = category.products.slice(0, 1);
		}
	}
	if (collectionSlug) {
		const { collection } = await executeGraphql(CollectionGetProductsListDocument, {
			slug: collectionSlug,
		});
		if (collection && collection.products.length > 1) {
			relatedProducts = [...relatedProducts, ...collection.products.slice(0, 1)];
		}
	}

	if (relatedProducts.length < 4) {
		const { products } = await executeGraphql(ProductsGetListDocument, { offset: 0 });
		relatedProducts = [...relatedProducts, ...products.data.slice(0, 4 - relatedProducts.length)];
	}

	return (
		<div data-testid="related-products">
			<ProductsList products={relatedProducts} />
		</div>
	);
};

export { RelatedProducts };
