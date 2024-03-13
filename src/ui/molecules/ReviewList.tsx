import React from "react";
type ReviewListProps = {
	reviews: {
		author: string;
		description: string;
		email: string;
		id: string;
		rating: number;
		title: string;
	}[];
};
const ReviewList = ({ reviews }: ReviewListProps) => {
	if (reviews.length < 1) {
		return <div>No reviews</div>;
	}
	return (
		<>
			{reviews.map((review) => (
				<div key={review.id} className="w-full rounded bg-white p-4 shadow  2xl:basis-1/2">
					<h3 className="mb-2 text-xl font-bold">{review.title}</h3>
					<p className="mb-2 text-gray-500">{review.author}</p>
					<p className="mb-4 text-gray-700">{review.description}</p>
					<div className="flex items-center">
						<span>
							Rating:{" "}
							<span className="text-yellow-500 shadow-sm">
								{"★".repeat(review.rating)}
								{"☆".repeat(5 - review.rating)}
							</span>
						</span>
					</div>
					<p className="mt-4 text-blue-500">{review.email}</p>
				</div>
			))}
		</>
	);
};

export { ReviewList };
