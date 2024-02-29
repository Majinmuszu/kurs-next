"use server";
import { revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/api";
import { CartChangeItemQuantityMutationDocument } from "@/gql/graphql";

export const changeItemQuantity = async (productId: string, quantity: number, id: string) => {
	const { cartChangeItemQuantity } = await executeGraphql({
		query: CartChangeItemQuantityMutationDocument,
		variables: {
			productId,
			quantity,
			id,
		},
	});
	revalidateTag("cart");
	return cartChangeItemQuantity;
};
