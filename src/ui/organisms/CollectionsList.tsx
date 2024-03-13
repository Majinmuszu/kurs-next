import React from "react";
import Link from "next/link";
import { executeGraphql } from "@/api/api";
import { CollectionsGetListDocument } from "@/gql/graphql";
import { ProductCardImage } from "@/ui/atoms/ProductCardImage";

const CollectionsList = async () => {
	const { collections } = await executeGraphql({ query: CollectionsGetListDocument });
	return (
		<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{collections.data.map((col) => (
				<li key={col.slug}>
					<Link href={`/collections/${col.slug}`}>
						<article className="transform rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
							{col.products[0].images[0].url && (
								<ProductCardImage
									src={col.products[0].images[0].url}
									alt={col.products[0].images[0].alt}
								/>
							)}
							<div>
								<div className="mb-2">
									<h3 className="text-lg font-bold">{col.name}</h3>
								</div>
							</div>
						</article>
					</Link>
				</li>
			))}
		</ul>
	);
};

export { CollectionsList };
