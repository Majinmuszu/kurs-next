import { type Metadata } from "next/types";
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import { ProductGetItemByIdDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const { product } = await executeGraphql(ProductGetItemByIdDocument, { id: params.id });

	return {
		title: product?.name,
		description: product?.description,
	};
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
	const { product } = await executeGraphql(ProductGetItemByIdDocument, { id: params.id });
	if (!product) {
		throw notFound();
	}
	return (
		<>
			<article className="justify-between rounded-lg bg-white p-4 shadow-lg md:flex md:p-7">
				<div className="relative mb-4 min-h-96 w-full md:mr-5 md:w-1/2">
					{product?.images[0].url && (
						<Image
							src={product.images[0].url}
							alt={product.name}
							fill
							className="mx-auto h-auto w-auto rounded-lg object-contain"
						/>
					)}
				</div>
				<div className="mb-4 md:w-4/6">
					<div className="mb-4">
						<h1 className="mb-1 text-4xl font-bold">{product.name}</h1>
						<p className="mb-4 text-xl font-light">{product.categories[0].name}</p>
						<p className="text-2xl text-green-600 md:text-3xl">{product.price / 100} zł</p>
					</div>
					<div className="mb-4 items-center justify-between lg:flex lg:flex-row-reverse">
						{product.rating && (
							<div className="mb-4 lg:mb-0">
								<span className="inline text-yellow-500">
									{Array(Math.round(product.rating)).fill("★").join("")}
								</span>
								{/* <span className="text-gray-500">({product.rating.count} opinii)</span> */}
							</div>
						)}
						<button className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
							Dodaj do koszyka
						</button>
					</div>
					<div className="mb-4">
						<p className="font-semibold text-gray-700">{product.description}</p>
					</div>
					{/* <div
					className="text-gray-700"
					dangerouslySetInnerHTML={{ __html: product.longDescription }}
				/> */}
				</div>
			</article>
			<aside className="mt-4">
				<h2>Related products</h2>
				<RelatedProducts
					categorySlug={product.categories[0] ? product.categories[0].slug : null}
					collectionSlug={product.collections[0] ? product.collections[0].slug : null}
				/>
			</aside>
		</>
	);
};

export default ProductPage;
