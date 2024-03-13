import React from "react";
import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { type SortOption, Sorter } from "@/ui/molecules/Sorter";

export async function generateStaticParams() {
	const res = await executeGraphql({ query: ProductsGetListDocument, variables: { offset: 0 } });
	const total = Math.ceil(res.products.meta.total / 8);
	const params = [];
	for (let i = 1; i <= total; i++) {
		params.push({ pageNumber: i.toString() });
	}
	return params;
}

const ProductsPagePaginated = async ({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { sortBy: SortOption };
}) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 8;
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset },
		next: { tags: ["sortList"] },
	});
	const total = Math.ceil(products.meta.total / 8);

	const sortedProducts = products.data.sort((a, b) => {
		if (searchParams.sortBy === "price-asc") {
			return a.price - b.price;
		} else if (searchParams.sortBy === "price-desc") {
			return b.price - a.price;
		} else if (searchParams.sortBy === "rating-asc") {
			return (a.rating || 0) - (b.rating || 0);
		} else if (searchParams.sortBy === "rating-desc") {
			return (b.rating || 0) - (a.rating || 0);
		}
		return 0;
	});

	return (
		<div>
			<Sorter pageNumber={page} sortBy={searchParams?.sortBy} />
			<ProductsList products={sortedProducts} />
			<Pagination currentPage={page} totalPages={total} />
		</div>
	);
};

export default ProductsPagePaginated;
