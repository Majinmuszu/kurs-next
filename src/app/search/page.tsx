import React from "react";
import { executeGraphql } from "@/api/api";
import { ProductsGetBySearchDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {
	const { products } = await executeGraphql(ProductsGetBySearchDocument, {
		search: searchParams.query,
	});

	if (!products.data || products.data.length < 1) {
		return <div>Sorry, nothing matches Your search, try again with other query</div>;
	}
	return (
		<section>
			<ProductsList products={products.data} />
		</section>
	);
};

export default SearchPage;
