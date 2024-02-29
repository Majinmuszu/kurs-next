import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function Home() {
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset: 0 },
	});
	return (
		<section>
			<ProductsList products={products.data} />
		</section>
	);
}
