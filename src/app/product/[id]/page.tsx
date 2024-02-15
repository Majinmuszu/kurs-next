import { ProductItemType } from "@/types/product";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.id}`);
	const product = (await res.json()) as ProductItemType;
	return (
		<article className="justify-between rounded-lg bg-white p-4 shadow-lg md:flex md:p-7">
			<div className="mb-4 md:mr-5">
				<img src={product.image} alt={product.title} className="h-auto w-full rounded-lg" />
			</div>
			<div className="mb-4 md:w-4/6">
				<div className="mb-4">
					<h1 className="mb-1 text-4xl font-bold">{product.title}</h1>
					<p className="mb-4 text-xl font-light">{product.category}</p>
					<p className="text-2xl text-green-600 md:text-3xl">{product.price / 100} zł</p>
				</div>
				<div className="mb-4 items-center justify-between lg:flex lg:flex-row-reverse">
					<div className="mb-4 lg:mb-0">
						<span className="inline text-yellow-500">
							{Array(Math.round(product.rating.rate)).fill("★").join("")}
						</span>
						<span className="text-gray-500">({product.rating.count} opinii)</span>
					</div>
					<button className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
						Dodaj do koszyka
					</button>
				</div>
				<div className="mb-4">
					<p className="font-semibold text-gray-700">{product.description}</p>
				</div>
				<div
					className="text-gray-700"
					dangerouslySetInnerHTML={{ __html: product.longDescription }}
				/>
			</div>
		</article>
	);
};

export default ProductPage;
