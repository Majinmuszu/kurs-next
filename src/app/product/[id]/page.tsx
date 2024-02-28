import { type Metadata } from "next/types";
import React, { Suspense } from "react";
import { executeGraphql } from "@/api/api";
import { ProductGetItemByIdDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { Loader } from "@/ui/atoms/Loader";
import { ProductSummary } from "@/ui/organisms/ProductSummary";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const { product } = await executeGraphql(ProductGetItemByIdDocument, { id: params.id });

	return {
		title: product?.name,
		description: product?.description,
	};
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
	return (
		<>
			<ProductSummary id={params.id} />

			<aside className="mt-4">
				<h2 className="mb-2 text-xl font-semibold">Related products</h2>
				<Suspense fallback={<Loader />}>
					<RelatedProducts productId={params.id} />
				</Suspense>
			</aside>
		</>
	);
};

export default ProductPage;
