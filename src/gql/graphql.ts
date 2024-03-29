/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CartAddItemMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CartAddItemMutationMutation = { cartAddItem: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ alt: string, url: string }> } }> } };

export type CartChangeItemQuantityMutationMutationVariables = Exact<{
  productId?: Scalars['ID']['input'];
  quantity?: Scalars['Int']['input'];
  id?: Scalars['ID']['input'];
}>;


export type CartChangeItemQuantityMutationMutation = { cartChangeItemQuantity: { id: string, items: Array<{ quantity: number }> } };

export type CartCompleteMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
}>;


export type CartCompleteMutation = { cartComplete: { id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown, createdAt: unknown } };

export type CartFindOrCreateMutationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<MutationCartFindOrCreateInput>;
}>;


export type CartFindOrCreateMutationMutation = { cartFindOrCreate: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, price: number, images: Array<{ url: string, alt: string }> } }> } };

export type CartRemoveItemMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveItemMutationMutation = { cartRemoveItem: { id: string } };

export type CategoriesGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesGetListQuery = { categories: { data: Array<{ name: string, slug: string, description: string, id: string, products: Array<{ images: Array<{ url: string, alt: string }> }> }>, meta: { total: number, count: number } } };

export type CategoryGetProductsListQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type CategoryGetProductsListQuery = { category?: { description: string, name: string, slug: string, products: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ name: string }> }> } | null };

export type CollectionGetProductsListQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type CollectionGetProductsListQuery = { collection?: { description: string, name: string, slug: string, products: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ name: string }> }> } | null };

export type CollectionsGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsGetListQuery = { collections: { data: Array<{ slug: string, description: string, name: string, id: string, products: Array<{ images: Array<{ url: string, alt: string }> }> }>, meta: { count: number, total: number } } };

export type OrdersGetListByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrdersGetListByEmailQuery = { orders: { data: Array<{ createdAt: unknown, id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown }> } };

export type ProductGetItemByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ProductGetItemByIdQuery = { product?: { description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> } | null };

export type ProductGetReviewsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ProductGetReviewsQuery = { product?: { reviews: Array<{ author: string, description: string, email: string, id: string, rating: number, title: string }> } | null };

export type ProductItemFragment = { description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> };

export type ProductListItemFragment = { id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ name: string }> };

export type ProductsGetBySearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsGetBySearchQuery = { products: { data: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ name: string }> }>, meta: { count: number, total: number } } };

export type ProductsGetListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsGetListQuery = { products: { data: Array<{ id: string, name: string, price: number, rating?: number | null, images: Array<{ url: string, alt: string }>, categories: Array<{ name: string }> }>, meta: { count: number, total: number } } };

export type ReviewCreateMutationMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type ReviewCreateMutationMutation = { reviewCreate: { id: string } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductItemFragmentDoc = new TypedDocumentString(`
    fragment ProductItem on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}
    `, {"fragmentName":"ProductItem"}) as unknown as TypedDocumentString<ProductItemFragment, unknown>;
export const ProductListItemFragmentDoc = new TypedDocumentString(`
    fragment ProductListItem on Product {
  id
  name
  images {
    url
    alt
  }
  price
  rating
  categories {
    name
  }
}
    `, {"fragmentName":"ProductListItem"}) as unknown as TypedDocumentString<ProductListItemFragment, unknown>;
export const CartAddItemMutationDocument = new TypedDocumentString(`
    mutation CartAddItemMutation($id: ID!, $productId: String!, $quantity: Int = 1) {
  cartAddItem(
    id: $id
    input: {item: {productId: $productId, quantity: $quantity}}
  ) {
    id
    items {
      quantity
      product {
        id
        name
        images {
          alt
          url
        }
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartAddItemMutationMutation, CartAddItemMutationMutationVariables>;
export const CartChangeItemQuantityMutationDocument = new TypedDocumentString(`
    mutation CartChangeItemQuantityMutation($productId: ID! = "1", $quantity: Int! = 1, $id: ID! = "") {
  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {
    id
    items {
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<CartChangeItemQuantityMutationMutation, CartChangeItemQuantityMutationMutationVariables>;
export const CartCompleteDocument = new TypedDocumentString(`
    mutation CartComplete($cartId: ID!, $userEmail: String!) {
  cartComplete(cartId: $cartId, userEmail: $userEmail) {
    id
    lines
    status
    totalAmount
    updatedAt
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CartCompleteMutation, CartCompleteMutationVariables>;
export const CartFindOrCreateMutationDocument = new TypedDocumentString(`
    mutation CartFindOrCreateMutation($id: ID, $input: MutationCartFindOrCreateInput = {}) {
  cartFindOrCreate(id: $id, input: $input) {
    id
    items {
      quantity
      product {
        id
        name
        images {
          url
          alt
        }
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartFindOrCreateMutationMutation, CartFindOrCreateMutationMutationVariables>;
export const CartRemoveItemMutationDocument = new TypedDocumentString(`
    mutation CartRemoveItemMutation($id: ID!, $productId: ID!) {
  cartRemoveItem(id: $id, productId: $productId) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartRemoveItemMutationMutation, CartRemoveItemMutationMutationVariables>;
export const CategoriesGetListDocument = new TypedDocumentString(`
    query CategoriesGetList {
  categories(take: 10) {
    data {
      name
      slug
      description
      id
      products {
        images {
          url
          alt
        }
      }
    }
    meta {
      total
      count
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesGetListQuery, CategoriesGetListQueryVariables>;
export const CategoryGetProductsListDocument = new TypedDocumentString(`
    query CategoryGetProductsList($slug: String) {
  category(slug: $slug) {
    products {
      ...ProductListItem
    }
    description
    name
    slug
  }
}
    fragment ProductListItem on Product {
  id
  name
  images {
    url
    alt
  }
  price
  rating
  categories {
    name
  }
}`) as unknown as TypedDocumentString<CategoryGetProductsListQuery, CategoryGetProductsListQueryVariables>;
export const CollectionGetProductsListDocument = new TypedDocumentString(`
    query CollectionGetProductsList($slug: String) {
  collection(slug: $slug) {
    products {
      ...ProductListItem
    }
    description
    name
    slug
  }
}
    fragment ProductListItem on Product {
  id
  name
  images {
    url
    alt
  }
  price
  rating
  categories {
    name
  }
}`) as unknown as TypedDocumentString<CollectionGetProductsListQuery, CollectionGetProductsListQueryVariables>;
export const CollectionsGetListDocument = new TypedDocumentString(`
    query CollectionsGetList {
  collections {
    data {
      slug
      description
      name
      id
      products {
        images {
          url
          alt
        }
      }
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsGetListQuery, CollectionsGetListQueryVariables>;
export const OrdersGetListByEmailDocument = new TypedDocumentString(`
    query OrdersGetListByEmail($email: String = "artur.krasniewski1@gmail.com") {
  orders(email: $email, take: 50) {
    data {
      createdAt
      id
      lines
      status
      totalAmount
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<OrdersGetListByEmailQuery, OrdersGetListByEmailQueryVariables>;
export const ProductGetItemByIdDocument = new TypedDocumentString(`
    query ProductGetItemById($id: ID) {
  product(id: $id) {
    ...ProductItem
  }
}
    fragment ProductItem on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}`) as unknown as TypedDocumentString<ProductGetItemByIdQuery, ProductGetItemByIdQueryVariables>;
export const ProductGetReviewsDocument = new TypedDocumentString(`
    query ProductGetReviews($id: ID) {
  product(id: $id) {
    reviews {
      author
      description
      email
      id
      rating
      title
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetReviewsQuery, ProductGetReviewsQueryVariables>;
export const ProductsGetBySearchDocument = new TypedDocumentString(`
    query ProductsGetBySearch($search: String) {
  products(take: 10, search: $search) {
    data {
      ...ProductListItem
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  images {
    url
    alt
  }
  price
  rating
  categories {
    name
  }
}`) as unknown as TypedDocumentString<ProductsGetBySearchQuery, ProductsGetBySearchQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($offset: Int) {
  products(take: 8, skip: $offset) {
    data {
      ...ProductListItem
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductListItem on Product {
  id
  name
  images {
    url
    alt
  }
  price
  rating
  categories {
    name
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
export const ReviewCreateMutationDocument = new TypedDocumentString(`
    mutation ReviewCreateMutation($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<ReviewCreateMutationMutation, ReviewCreateMutationMutationVariables>;