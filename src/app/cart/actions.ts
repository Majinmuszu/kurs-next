"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/api";
import {
	CartChangeItemQuantityMutationDocument,
	CartRemoveItemMutationDocument,
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
	return cartRemoveItem;
};
