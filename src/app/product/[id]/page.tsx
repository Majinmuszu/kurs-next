import { type Metadata } from "next/types";
import React, { Suspense } from "react";
import { executeGraphql } from "@/api/api";
import { ProductGetItemByIdDocument, ProductsGetListDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { Loader } from "@/ui/atoms/Loader";
import { ProductSummary } from "@/ui/organisms/ProductSummary";
import { Reviews } from "@/ui/organisms/Reviews";

export async function generateStaticParams() {
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset: 0 },
	});
	const params = products.data.map((product) => {
		return { id: product.id };
	});
	return params;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const { product } = await executeGraphql({
		query: ProductGetItemByIdDocument,
		variables: { id: params.id },
	});

	return {
		title: product?.name,
		description: product?.description,
		metadataBase: process.env.HOST ? new URL(process.env.HOST) : null,
	};
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
	return (
		<>
			<ProductSummary id={params.id} />

			<aside className="mt-8">
				<h2 className=" mb-2 text-xl font-semibold">Related products</h2>
				<Suspense fallback={<Loader />}>
					<RelatedProducts productId={params.id} />
				</Suspense>
			</aside>
			<aside className="mt-8">
				<h2 className="mb-2 text-xl font-semibold">Reviews</h2>
				<Suspense fallback={<Loader />}>
					<Reviews productId={params.id} />
				</Suspense>
			</aside>
		</>
	);
};

export default ProductPage;
