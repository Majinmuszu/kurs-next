import React from "react";

const CategoryPage = ({ params }: { params: { categorySlug: string; pageNumber: string } }) => {
	return (
		<div>
			CategoryPage <br /> cat: {params.categorySlug} <br /> page: {params.pageNumber}
		</div>
	);
};

export default CategoryPage;
