import { ProductItemType } from "@/types/product";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.id}`);
	const product = await res.json();
	return (
		<article className="mx-auto max-w-screen-md rounded-lg bg-white p-4 shadow-lg">
			<div className="mb-4">
				<img src={product.image} alt={product.title} className="h-auto w-full rounded-lg" />
			</div>
			<div className="mb-4">
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-4xl font-bold">{product.title}</h1>
					<p className="text-2xl text-green-600">{product.price / 100} zł</p>
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
