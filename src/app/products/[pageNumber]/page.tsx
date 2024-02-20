import { getProductsWithOffset } from "@/api/productApi";
import Pagination from "@/ui/molecules/Pagination";
import ProductsList from "@/ui/organisms/ProductsList";
import React from "react";

export async function generateStaticParams() {
	const params = [];
	for (let i = 1; i <= 10; i++) {
		params.push({ pageNumber: i.toString() });
	}
	return params;
}

const ProductsPagePaginated = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 20;
	const products = await getProductsWithOffset(offset);
	return (
		<div>
			<ProductsList products={products} />
			<Pagination currentPage={page} />
		</div>
	);
};

export default ProductsPagePaginated;
