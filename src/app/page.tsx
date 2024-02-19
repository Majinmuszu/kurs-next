import { getProductsWithOffset } from "@/api/productApi";
import { ProductItemType } from "@/types/product";
import ProductsList from "@/ui/organisms/ProductsList";

export default async function Home() {
	const products = await getProductsWithOffset(0);
	return (
		<section className="my-8">
			<ProductsList products={products} />
		</section>
	);
}
