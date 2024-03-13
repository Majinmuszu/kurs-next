import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
	CartAddItemMutationDocument,
	CartChangeItemQuantityMutationDocument,
	CartFindOrCreateMutationDocument,
	type TypedDocumentString,
} from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	cache,
	next,
	headers,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	cache?: RequestCache;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		cache,
		next,
		headers: {
			...headers,
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
}

export const addToCart = async (productId: string) => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		const cart = await createCartAndAddItem(productId);
		return cart;
	} else {
		const res = await getCartFromCookie();
		const existingInCart = res?.items.find((item) => item.product.id === productId);
		if (!existingInCart) {
			const cartAddItem = await executeGraphql({
				query: CartAddItemMutationDocument,
				variables: {
					id: cartId,
					productId,
				},
				next: {
					tags: ["cart"],
				},
				cache: "no-store",
			});
			if (!cartAddItem) {
				throw new Error("Can't add to cart");
			}
			return cartAddItem;
		}
		const { cartChangeItemQuantity } = await executeGraphql({
			query: CartChangeItemQuantityMutationDocument,
			variables: {
				productId: existingInCart.product.id,
				quantity: existingInCart.quantity + 1,
				id: res?.id,
			},
			cache: "no-store",
		});
		revalidateTag("cart");
		return cartChangeItemQuantity;
	}
};

export const getCartFromCookie = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return null;
	}
	const { cartFindOrCreate } = await executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});
	return cartFindOrCreate;
};

export const createCartAndAddItem = async (productId: string) => {
	const { cartFindOrCreate } = await executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {
			input: {
				items: [
					{
						productId: productId,
						quantity: 1,
					},
				],
			},
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});
	if (cartFindOrCreate.id) {
		cookies().set("cartId", cartFindOrCreate.id);
		return cartFindOrCreate;
	} else {
		throw new Error("Can't create cart, bruh..");
	}
};
