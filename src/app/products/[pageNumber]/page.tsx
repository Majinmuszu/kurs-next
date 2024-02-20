import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import Pagination from "@/ui/molecules/Pagination";
import ProductsList from "@/ui/organisms/ProductsList";
import React from "react";

export async function generateStaticParams() {
	const res = await executeGraphql(ProductsGetListDocument, { offset: 0 });
	const total = Math.ceil(res.products.meta.total / 10);
	const params = [];
	for (let i = 1; i <= total; i++) {
		params.push({ pageNumber: i.toString() });
	}
	return params;
}

const ProductsPagePaginated = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 10;
	const res = await executeGraphql(ProductsGetListDocument, { offset });
	return (
		<div>
			<ProductsList products={res} />
			<Pagination currentPage={page} />
		</div>
	);
};

export default ProductsPagePaginated;
