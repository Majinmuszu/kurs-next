"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { executeGraphql } from "@/api/api";
import {
	CartChangeItemQuantityMutationDocument,
	CartRemoveItemMutationDocument,
	ReviewCreateMutationDocument,
} from "@/gql/graphql";

export const changeItemQuantity = async (productId: string, quantity: number, id: string) => {
	const { cartChangeItemQuantity } = await executeGraphql({
		query: CartChangeItemQuantityMutationDocument,
		variables: {
			productId,
			quantity,
			id,
		},
		cache: "no-store",
	});
	revalidateTag("cart");
	return cartChangeItemQuantity;
};

export const removeItem = async (id: string, productId: string) => {
	const { cartRemoveItem } = await executeGraphql({
		query: CartRemoveItemMutationDocument,
		variables: { id, productId },
		cache: "no-store",
	});
	revalidateTag("cart");
	return cartRemoveItem;
};

export const createReview = async (
	review: {
		author: string;
		description: string;
		email: string;
		rating: number;
		title: string;
	},
	productId: string,
) => {
	const { author, description, email, rating, title } = review;
	const { reviewCreate } = await executeGraphql({
		query: ReviewCreateMutationDocument,
		variables: { author, description, email, productId, rating, title },
	});
	revalidateTag("reviews");
	return reviewCreate;
};

export const deleteCookie = async () => {
	cookies().set("cartId", "");
};
