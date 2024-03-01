/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { executeGraphql } from "@/api/api";
import { ProductGetItemByIdDocument } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "My awesome szop";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({ params }: { params: { id: string } }) {
	const { product } = await executeGraphql({
		query: ProductGetItemByIdDocument,
		variables: { id: params.id },
	});
	if (!product) {
		return (
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl"
				style={{
					background: `
			linear-gradient(
			  90deg,
			  rgb(6,172,214) 0%,
			  rgb(0,0,0) 20%,
			  rgb(0,0,0) 80%,
			  rgb(6,71,255) 100%
			)`,
				}}
			>
				<p tw="font-sans uppercase m-0 p-0 text-[101px] leading-4">Here should be cool image</p>
				<p tw="font-serif m-0 p-0 font-black">but there is no such product</p>
				<p tw="m-0 mt-2">Sorry</p>
			</div>
		);
	}
	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl"
				style={{
					background: `
				    linear-gradient(
				      90deg,
				      rgb(6,172,214) 0%,
				      rgb(0,0,0) 20%,
				      rgb(0,0,0) 80%,
				      rgb(6,71,255) 100%
				    )`,
				}}
			>
				{" "}
				<div tw="h-1/3 w-1/3 flex justify-center items-center">
					<img
						tw="w-full h-full"
						style={{
							objectFit: "contain",
						}}
						width={product.images[0].width}
						height={product.images[0].height}
						src={product.images[0].url}
						alt={product.images[0].alt}
					/>
				</div>
				<p tw="font-sans uppercase m-0 mt-4 p-0 text-3xl leading-4">{product?.name}</p>
				<p tw="font-serif m-0 mt-3 p-0 font-black text-2xl italic">{product.description}</p>
				<p tw="m-0 mt-2 text-2xl text-green-600">{product.price / 100}zł</p>
			</div>
		),
	);
}
