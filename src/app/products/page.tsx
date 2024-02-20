import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import Pagination from "@/ui/molecules/Pagination";
import ProductsList from "@/ui/organisms/ProductsList";
import React from "react";

const ProductsPage = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 10;
	const products = await executeGraphql(ProductsGetListDocument, { offset });
	return (
		<section>
			<ProductsList products={products} />
			<Pagination currentPage={page} />
		</section>
	);
};

export default ProductsPage;
