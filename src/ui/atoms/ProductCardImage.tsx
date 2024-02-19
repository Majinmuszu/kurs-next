import React from "react";
import Image from "next/image";
import { placeholder } from "@/helpers/placeholder";
import { getPlaiceholder } from "plaiceholder";
const probe = require("probe-image-size");

const ProductCardImage = async ({ src, alt }: { src: string; alt: string }) => {
	const blur = await placeholder(src);
	const imgSize = await probe(src);
	return (
		<div className="mb-4 w-full sm:h-32">
			<Image
				src={src}
				alt={alt}
				width={imgSize.width}
				height={imgSize.height}
				quality={40}
				className="mx-auto h-full w-auto rounded-lg sm:max-h-36"
				placeholder="blur"
				blurDataURL={blur}
			/>
		</div>
	);
};

export default ProductCardImage;
