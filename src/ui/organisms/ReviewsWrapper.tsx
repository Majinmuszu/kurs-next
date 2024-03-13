"use client";
import React, { useOptimistic, useTransition } from "react";
import { ReviewList } from "@/ui/molecules/ReviewList";
import { createReview } from "@/api/actions";

type Review = {
	author: string;
	description: string;
	email: string;
	id: string;
	rating: number;
	title: string;
};
type ReviewWrapperProps = {
	reviews: Review[];
	productId: string;
};

const ReviewsWrapper = ({ reviews, productId }: ReviewWrapperProps) => {
	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(state, newReview: Review) => [newReview, ...state],
	);

	const [isPending, _startTransition] = useTransition();

	const handleFormAction = async (formData: FormData) => {
		const data = Object.fromEntries(formData) as unknown as {
			name: string;
			content: string;
			email: string;
			id: string;
			rating: number;
			headline: string;
		};
		const newReview = {
			author: data.name,
			description: data.content,
			email: data.email,
			rating: Number(data.rating),
			title: data.headline,
		};
		setOptimisticReviews({
			id: `${data.content}+${Math.random() * 100}`,
			...newReview,
		});
		const res = await createReview(newReview, productId);
		if (res.id) {
			const form = document?.getElementById("add-review-form") as HTMLFormElement;
			form.reset();
		}
	};
	return (
		<>
			<div className="w-full rounded bg-white p-4 shadow ">
				<form
					className="rounded bg-white p-4 shadow"
					id="add-review-form"
					data-testid="add-review-form"
				>
					<h3 className="mb-2 text-xl font-bold">Want to add review? Here it is! Nice Form!</h3>
					<label className="mb-2 block text-lg font-semibold">
						Title:
						<input
							type="text"
							name="headline"
							disabled={isPending}
							minLength={2}
							required
							className="mt-1 block w-full rounded border-2 border-gray-300 p-2 valid:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Author:
						<input
							type="text"
							name="name"
							disabled={isPending}
							minLength={2}
							required
							className="mt-1 block w-full rounded border-2 border-gray-300 p-2 valid:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Description:
						<textarea
							name="content"
							disabled={isPending}
							minLength={2}
							required
							className="mt-1 block w-full rounded border-2 border-gray-300 p-2 valid:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</label>
					<label className="mb-2 block text-lg font-semibold">
						Rating:
						<select
							name="rating"
							disabled={isPending}
							required
							className="mt-1 block w-full rounded border-2 border-gray-300 p-2 valid:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						>
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
							disabled={isPending}
							required
							pattern="[^\s@]+@[^\s@]+\.[^\s@]+[^\s@]+"
							className="mt-1 block w-full rounded border-2 border-gray-300 p-2 valid:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</label>
					<button
						formAction={handleFormAction}
						className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
					>
						{isPending ? (
							<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25" />
						) : (
							"Submit Review"
						)}
					</button>
				</form>
			</div>
			<ReviewList reviews={optimisticReviews} />
		</>
	);
};

export { ReviewsWrapper };
