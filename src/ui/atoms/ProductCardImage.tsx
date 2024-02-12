import React from "react";

const ProductCardImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="mb-4">
			<img src={src} alt={alt} className="mx-auto" />
		</div>
	);
};

export default ProductCardImage;
