export type ProductListItemType = {
	id: string;
	name: string;
	price: number;
	images: Array<{
		url: string;
		alt: string;
	}>;
	categories: Array<{
		name: string;
	}>;
};
