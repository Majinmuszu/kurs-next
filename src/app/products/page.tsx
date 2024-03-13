import React from "react";
import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductsList } from "@/ui/organisms/ProductsList";

const ProductsPage = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 8;
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset },
	});
	const total = Math.ceil(products.meta.total / 10);
	return (
		<section>
			<ProductsList products={products.data} />
			<Pagination currentPage={page} totalPages={total} />
		</section>
	);
};

export default ProductsPage;
