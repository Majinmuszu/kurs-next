import React from "react";
import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductsList } from "@/ui/organisms/ProductsList";

export async function generateStaticParams() {
	const res = await executeGraphql({ query: ProductsGetListDocument, variables: { offset: 0 } });
	const total = Math.ceil(res.products.meta.total / 8);
	const params = [];
	for (let i = 1; i <= total; i++) {
		params.push({ pageNumber: i.toString() });
	}
	return params;
}

const ProductsPagePaginated = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 8;
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset },
	});
	const total = Math.ceil(products.meta.total / 8);
	return (
		<div>
			<ProductsList products={products.data} />
			<Pagination currentPage={page} totalPages={total} />
		</div>
	);
};

export default ProductsPagePaginated;
