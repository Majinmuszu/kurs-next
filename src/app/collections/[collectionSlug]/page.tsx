import React from "react";

const CollectionPage = ({ params }: { params: { collectionSlug: string } }) => {
	return (
		<div>
			CollectionPage <br /> collection: {params.collectionSlug}
		</div>
	);
};

export default CollectionPage;
