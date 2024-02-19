import Link from "next/link";

type PaginationProps = {
	currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
	return (
		<div className="mt-4 flex justify-center" aria-label="pagination">
			{currentPage > 1 && (
				<Link href={`/products/${currentPage - 1}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
					&lt; Prev
				</Link>
			)}
			{currentPage - 2 >= 1 && (
				<Link href={`/products/${currentPage - 2}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
					{currentPage - 2}
				</Link>
			)}
			{currentPage - 1 > 1 && (
				<Link href={`/products/${currentPage - 1}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
					{currentPage - 1}
				</Link>
			)}
			<Link
				href={`/products/${currentPage}`}
				className={`mx-1 rounded bg-blue-500 px-3 py-1 text-white`}
			>
				{currentPage}
			</Link>
			<Link href={`/products/${currentPage + 1}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
				{currentPage + 1}
			</Link>
			<Link href={`/products/${currentPage + 2}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
				{currentPage + 2}
			</Link>

			<Link href={`/products/${currentPage + 1}`} className="mx-1 rounded bg-gray-200 px-3 py-1">
				Next &gt;
			</Link>
		</div>
	);
};

export default Pagination;
