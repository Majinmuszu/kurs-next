import { executeGraphql } from "@/api/api";
import { ProductsGetListDocument } from "@/gql/graphql";
import ProductsList from "@/ui/organisms/ProductsList";

export default async function Home() {
	const res = await executeGraphql(ProductsGetListDocument, {offset: 0});
	return (
		<section>
			<ProductsList products={res} />
		</section>
	);
}
