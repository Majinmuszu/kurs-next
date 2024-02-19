import { ProductItemType } from "@/types/product";
import Pagination from "@/ui/molecules/Pagination";
import ProductsList from "@/ui/organisms/ProductsList";
import React from "react";

const ProductsPagePaginated = async ({ params }: { params: { pageNumber: string } }) => {
	const page = params.pageNumber ? parseInt(params.pageNumber) : 1;
	const offset = (page - 1) * 20;
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=20&offset=${offset}`);
	const products = (await res.json()) as ProductItemType[];
	return (
		<div>
			<ProductsList products={products} />
			<Pagination currentPage={page} />
		</div>
	);
};

export default ProductsPagePaginated;
