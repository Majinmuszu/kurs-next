import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import { CollectionsList } from "@/ui/organisms/CollectionsList";
import { ProductsList } from "@/ui/organisms/ProductsList";

export default async function Home() {
	const { products } = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { offset: 0 },
	});
	return (
		<>
			<section className="mb-4 text-xl font-extrabold">
				<h1 className="mb-2">Our Collections</h1>
				<CollectionsList />
			</section>
			<section className="mb-4 text-xl font-bold">
				<h2 className="mb-2">Looking for these?</h2>
				<ProductsList products={products.data} />
			</section>
		</>
	);
}
