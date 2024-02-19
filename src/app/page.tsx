import { ProductItemType } from "@/types/product";
import ProductsList from "@/ui/organisms/ProductsList";
import { Metadata } from "next";

export default async function Home() {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
	const products = (await res.json()) as ProductItemType[];
	return (
		<section className="my-8">
			<ProductsList products={products} />
		</section>
	);
}
