import { ProductItemType } from "@/types/product";
import React from "react";

type ProductPageProps = {
	product: ProductItemType;
};

const mockProduct: ProductItemType = {
	id: "89bd9d8d-69a6-474e-8f46-7cc8796ed151",
	title: "Handcrafted Steel Pants",
	price: 832,
	description: "Andy shoes are designed to keeping in mind durability as well as trends...",
	category: "Jewelery",
	rating: {
		rate: 1.56,
		count: 870,
	},
	image: "https://naszsklep-api.vercel.app/images/81XH0e8fefL._AC_UY879_.jpg",
	longDescription:
		"## Tasty\nThe Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes...",
};

const ProductPage: React.FC<ProductPageProps> = ({ product = mockProduct }) => {
	return (
		<article className="mx-auto max-w-screen-md rounded-lg bg-white p-4 shadow-lg">
			<div className="mb-4">
				<img src={product.image} alt={product.title} className="h-auto w-full rounded-lg" />
			</div>
			<div className="mb-4">
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-4xl font-bold">{product.title}</h1>
					<p className="text-2xl text-green-600">${product.price}</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="mb-2">
						<span className="inline text-yellow-500">
							{Array(Math.round(product.rating.rate)).fill("★").join("")}
						</span>
						<span className="text-gray-500">({product.rating.count} opinii)</span>
					</div>
					<button className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
						Dodaj do koszyka
					</button>
				</div>
			</div>
			<section className="mb-4">
				<p className="text-gray-700">{product.description}</p>
			</section>
			<section
				className="mt-4 text-gray-700"
				dangerouslySetInnerHTML={{ __html: product.longDescription }}
			/>
		</article>
	);
};

export default ProductPage;
