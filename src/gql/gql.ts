/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetList {\n  categories(take: 10) {\n    data {\n      name\n      slug\n      description\n      id\n      products {\n        images {\n          url\n          alt\n        }\n      }\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetProductsList($slug: String) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItem\n    }\n    description\n    name\n    slug\n  }\n}": types.CategoryGetProductsListDocument,
    "query ProductGetItemById($id: ID) {\n  product(id: $id) {\n    ...ProductItem\n  }\n}": types.ProductGetItemByIdDocument,
    "fragment ProductItem on Product {\n  description\n  id\n  name\n  price\n  rating\n  slug\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n  images {\n    alt\n    height\n    url\n    width\n  }\n}": types.ProductItemFragmentDoc,
    "fragment ProductListItem on Product {\n  id\n  name\n  images {\n    url\n    alt\n  }\n  price\n  categories {\n    name\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetList($offset: Int) {\n  products(take: 10, skip: $offset) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories(take: 10) {\n    data {\n      name\n      slug\n      description\n      id\n      products {\n        images {\n          url\n          alt\n        }\n      }\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetProductsList($slug: String) {\n  category(slug: $slug) {\n    products {\n      ...ProductListItem\n    }\n    description\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoryGetProductsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetItemById($id: ID) {\n  product(id: $id) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductGetItemByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  description\n  id\n  name\n  price\n  rating\n  slug\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n  images {\n    alt\n    height\n    url\n    width\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  images {\n    url\n    alt\n  }\n  price\n  categories {\n    name\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($offset: Int) {\n  products(take: 10, skip: $offset) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
