import React from "react";
import { notFound } from "next/navigation";
import { executeGraphql } from "@/api/api";
import { ProductGetReviewsDocument } from "@/gql/graphql";
import { ReviewList } from "@/ui/molecules/ReviewList";

const Reviews = async ({ productId }: { productId: string }) => {
	const { product } = await executeGraphql({
		query: ProductGetReviewsDocument,
		variables: { id: productId },
	});
	if (!product) {
		throw notFound();
	}
	return (
		<div className="space-y-5 2xl:grid 2xl:grid-cols-2 2xl:gap-5 2xl:space-y-0">
			<div className="w-full rounded bg-white p-4 shadow  ">
				<form className="rounded bg-white p-4 shadow">
					<h3 className="mb-2 text-xl font-bold">Want to add review? Here it is! Nice Form!</h3>
					<label className="mb-2 block text-lg font-semibold">
						Title:
						<input
							type="text"
							name="title"
							className="mt-1 block w-full rounded border border-gray-300 p-2"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Author:
						<input
							type="text"
							name="author"
							className="mt-1 block w-full rounded border border-gray-300 p-2"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Description:
						<textarea
							name="description"
							className="mt-1 block w-full rounded border border-gray-300 p-2"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Rating:
						<select name="rating" className="mt-1 block w-full rounded border border-gray-300 p-2">
							{[1, 2, 3, 4, 5].map((value) => (
								<option key={value} value={value}>
									{value} {"★".repeat(value)}
								</option>
							))}
						</select>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Email:
						<input
							type="email"
							name="email"
							className="mt-1 block w-full rounded border border-gray-300 p-2"
						/>
					</label>
					<button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
						Submit Review
					</button>
				</form>
			</div>
			<ReviewList reviews={product.reviews} />
		</div>
	);
};

export { Reviews };
