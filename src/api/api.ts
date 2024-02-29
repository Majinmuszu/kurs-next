import { cookies } from "next/headers";
import {
	CartAddItemMutationDocument,
	CartFindOrCreateMutationDocument,
	type Exact,
	type InputMaybe,
	type MutationCartFindOrCreateInput,
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
		const cart = await getOrCreateCart(productId);
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

export const getOrCreateCart = async (productId?: string) => {
	const cartId = cookies().get("cartId")?.value;
	let options: Exact<{
		id?: InputMaybe<string> | undefined;
		input?: InputMaybe<MutationCartFindOrCreateInput> | undefined;
	}>;
	if (!productId) {
		if (!cartId) {
			throw new Error("something went wrong...");
		} // !productId && !cartId
		options = {
			id: cartId,
		}; // !productId & cartId
	} else {
		if (!cartId) {
			options = {
				input: {
					items: [
						{
							productId: productId,
							quantity: 1,
						},
					],
				},
			};
		} // productId && !cartId
		options = {
			id: cartId,
			input: {
				items: [
					{
						productId: productId,
						quantity: 1,
					},
				],
			},
		}; // productId && cartId
	}
	const { cartFindOrCreate } = await executeGraphql(CartFindOrCreateMutationDocument, options);
	if (cartFindOrCreate.id) {
		if (!cartId) {
			cookies().set("cartId", cartFindOrCreate.id);
		}
		return cartFindOrCreate;
	} else {
		throw new Error("Can't find or create cart, bruh..");
	}
};
