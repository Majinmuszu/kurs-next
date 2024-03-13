"use client";
import { useRouter } from "next/navigation";

export type SortOption = "price-asc" | "price-desc" | "rating-asc" | "rating-desc";

const Sorter = ({ pageNumber, sortBy }: { pageNumber: number; sortBy: SortOption }) => {
	const router = useRouter();
	const handleSortChange = async (option: SortOption) => {
		router.push(`/products/${pageNumber}?sortBy=${option}`);
	};
	return (
		<div className="flex items-center space-x-4 p-4">
			<span className="font-semibold">Sort by:</span>
			<button
				data-testid="sort-by-price"
				className={`${sortBy === "price-asc" && "bg-blue-600"} rounded-md bg-blue-300 p-2 shadow-md`}
				onClick={() => handleSortChange("price-asc")}
			>
				Price Asc
			</button>
			<button
				data-testid="sort-by-price"
				className={`${sortBy === "price-desc" && "bg-blue-600"} rounded-md bg-blue-300 p-2 shadow-md`}
				onClick={() => handleSortChange("price-desc")}
			>
				Price Desc
			</button>
			<button
				data-testid="sort-by-rating"
				className={`${sortBy === "rating-asc" && "bg-blue-600"} rounded-md bg-blue-300 p-2 shadow-md`}
				onClick={() => handleSortChange("rating-asc")}
			>
				Rating Asc
			</button>
			<button
				data-testid="sort-by-rating"
				className={`${sortBy === "rating-desc" && "bg-blue-600"} rounded-md bg-blue-300 p-2 shadow-md`}
				onClick={() => handleSortChange("rating-desc")}
			>
				Rating Desc
			</button>
		</div>
	);
};

export { Sorter };
