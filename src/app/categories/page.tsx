import React from "react";
import Link from "next/link";
import { executeGraphql } from "@/api/api";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { ProductCardImage } from "@/ui/atoms/ProductCardImage";

const AllCategoriesPage = async () => {
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
	return (
		<section>
			<ul
				className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
				data-testid="products-list"
			>
				{categories.data.map((cat) => (
					<li key={cat.slug}>
						<Link href={`/categories/${cat.slug}/1`}>
							<article className="transform rounded-md bg-white p-4 shadow-md transition-transform hover:scale-105">
								{cat.products[0].images[0].url && (
									<ProductCardImage
										src={cat.products[0].images[0].url}
										alt={cat.products[0].images[0].alt}
									/>
								)}
								<div>
									<div className="mb-2">
										<h3 className="text-lg font-bold">{cat.name}</h3>
									</div>
								</div>
							</article>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default AllCategoriesPage;
