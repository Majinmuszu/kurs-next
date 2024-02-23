import React from "react";
import Image from "next/image";

const ProductCardImage = async ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="relative mb-4 h-48 w-auto">
			<Image
				src={src}
				alt={alt}
				fill
				quality={45}
				className="mx-auto h-auto w-auto rounded-lg object-contain"
			/>
		</div>
	);
};

export { ProductCardImage };
