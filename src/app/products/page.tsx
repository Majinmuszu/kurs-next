import { getProductsWithOffset } from "@/api/productApi";
import { ProductItemType } from "@/types/product";
import Pagination from "@/ui/molecules/Pagination";
import ProductsList from "@/ui/organisms/ProductsList";
import React from "react";

const ProductsPage = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 20;
	const products = await getProductsWithOffset(offset);
	return (
		<section>
			<ProductsList products={products} />
			<Pagination currentPage={page} />
		</section>
	);
};

export default ProductsPage;
