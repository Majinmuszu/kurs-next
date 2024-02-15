export type ProductItemType = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
	image: string;
	longDescription: string;
};
type Rating = {
	rate: number;
	count: number;
};
