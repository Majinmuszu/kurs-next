import React from "react";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import { CategoriesGetListDocument, CategoryGetProductsListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";
import { Pagination } from "@/ui/molecules/Pagination";

type CategoryPageProps = {
	categorySlug: string;
	pageNumber: string;
};
export async function generateStaticParams() {
	const res = await executeGraphql(CategoriesGetListDocument);
	// const total = Math.ceil(res.categories.meta.total / 10);
	const params: CategoryPageProps[] = res.categories.data.map((c) => {
		return { categorySlug: c.slug, pageNumber: "1" };
	});
	// for (let i = 1; i <= total; i++) {
	// 	params.push({ pageNumber: i.toString() });
	// }
	return params;
}

const CategoryPage = async ({ params }: { params: CategoryPageProps }) => {
	const { category } = await executeGraphql(CategoryGetProductsListDocument, {
		slug: params.categorySlug,
	});

	if (!category) {
		throw notFound();
	}

	return (
		<section>
			<h1 className="mb-5 text-4xl font-bold">{category.name}</h1>
			{category.description && (
				<p className="mb-5 text-2xl font-medium italic text-gray-800">{category.description}</p>
			)}
			<ProductsList products={category.products} />
			<Pagination currentPage={1} totalPages={1} />
		</section>
	);
};

export default CategoryPage;
