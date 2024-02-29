import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { addToCart, executeGraphql } from "@/api/api";
import { ProductGetItemByIdDocument } from "@/gql/graphql";
import { AddToCartButton } from "@/ui/atoms/AddToCartBtn";

const ProductSummary = async ({ id }: { id: string }) => {
	const { product } = await executeGraphql({query: ProductGetItemByIdDocument, variables: { id }});
	if (!product) {
		throw notFound();
	}

	const addProductToCartAction = async () => {
		"use server";
		await addToCart(product.id);
		revalidateTag("cart");
	};

	return (
		<article className="justify-between rounded-lg bg-white p-4 shadow-lg md:flex md:p-7">
			<div className="relative mb-4 min-h-96 w-full md:mr-5 md:w-1/2">
				{product?.images[0].url && (
					<Image
						src={product.images[0].url}
						alt={product.name}
						fill
						loading="eager"
						quality={50}
						className="mx-auto h-auto w-auto rounded-lg object-contain"
					/>
				)}
			</div>
			<div className="mb-4 md:w-4/6">
				<div className="mb-4">
					<h1 className="mb-1 text-4xl font-bold">{product.name}</h1>
					<p className="mb-4 text-xl font-light">{product.categories[0].name}</p>
					<p className="text-2xl text-green-600 md:text-3xl">${product.price / 100}</p>
				</div>

				{product.rating && (
					<div className="mb-4">
						<span className="inline text-yellow-500">
							{Array(Math.round(product.rating)).fill("★").join("")}
						</span>
						{/* <span className="text-gray-500">({product.rating.count} opinii)</span> */}
					</div>
				)}
				<form action={addProductToCartAction} className="mb-4">
					<AddToCartButton />
				</form>
				<div className="mb-4">
					<p className="font-semibold text-gray-700">{product.description}</p>
				</div>
				{/* <div
					className="text-gray-700"
					dangerouslySetInnerHTML={{ __html: product.longDescription }}
				/> */}
			</div>
		</article>
	);
};

export { ProductSummary };
