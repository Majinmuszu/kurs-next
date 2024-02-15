import { ProductItemType } from "@/types/product";

export const getProductById = async (id: string) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const product = (await res.json()) as ProductItemType;
	return product;
};
