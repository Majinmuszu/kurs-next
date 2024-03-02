import React from "react";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import { ProductGetReviewsDocument } from "@/gql/graphql";
import { ReviewsWrapper } from "@/ui/organisms/ReviewsWrapper";

const Reviews = async ({ productId }: { productId: string }) => {
	const { product } = await executeGraphql({
		query: ProductGetReviewsDocument,
		variables: { id: productId },
		next: { tags: ["reviews"] },
	});
	if (!product) {
		throw notFound();
	}
	return (
		<div className="space-y-5 2xl:grid 2xl:grid-cols-2 2xl:gap-5 2xl:space-y-0">
			<ReviewsWrapper reviews={product.reviews.reverse()} productId={productId} />
		</div>
	);
};

export { Reviews };
