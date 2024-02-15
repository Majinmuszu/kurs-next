import Loader from "@/ui/atoms/Loader";
import ProductsList from "@/ui/organisms/ProductsList";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "My awesome szop",
	description: "My awesome description for my awesome szop.",
};

export default function Home() {
	return (
		<section className="my-8">
			<ProductsList />
		</section>
	);
}
