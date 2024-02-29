import { cookies } from "next/headers";
import {
	CartAddItemMutationDocument,
	CartFindOrCreateMutationDocument,
	type TypedDocumentString,
} from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
};

export const addToCart = async (productId: string) => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		const cart = await createCartAndAddItem(productId);
		return cart;
	} else {
		const cartAddItem = await executeGraphql(CartAddItemMutationDocument, {
			id: cartId,
			productId,
		});
		if (!cartAddItem) {
			throw new Error("Can't add to cart");
		}
		return cartAddItem;
	}
};

export const getCartFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	const { cartFindOrCreate } = await executeGraphql(CartFindOrCreateMutationDocument, {
		id: cartId,
	});
	return cartFindOrCreate;
};

export const createCartAndAddItem = async (productId: string) => {
	const { cartFindOrCreate } = await executeGraphql(CartFindOrCreateMutationDocument, {
		input: {
			items: [
				{
					productId: productId,
					quantity: 1,
				},
			],
		},
	});
	if (cartFindOrCreate.id) {
		cookies().set("cartId", cartFindOrCreate.id);
		return cartFindOrCreate;
	} else {
		throw new Error("Can't create cart, bruh..");
	}
};
