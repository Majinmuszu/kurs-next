import React from "react";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import { CollectionGetProductsListDocument, CollectionsGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export async function generateStaticParams() {
	const res = await executeGraphql({ query: CollectionsGetListDocument });
	const params = res.collections.data.map((c) => {
		return { collectionSlug: c.slug };
	});
	return params;
}

const CollectionPage = async ({ params }: { params: { collectionSlug: string } }) => {
	const { collection } = await executeGraphql({
		query: CollectionGetProductsListDocument,
		variables: {
			slug: params.collectionSlug,
		},
	});
	if (!collection) {
		throw notFound();
	}
	return (
		<section>
			<h1 className="mb-5 text-4xl font-bold">{collection.name}</h1>
			{collection.description && (
				<p className="mb-5 text-2xl font-medium italic text-gray-800">{collection.description}</p>
			)}
			<ProductsList products={collection.products} />
		</section>
	);
};

export default CollectionPage;
