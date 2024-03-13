import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/atoms/SearchInput";
import { CartIcon } from "@/ui/icons/CartIcon";
import { executeGraphql, getCartFromCookie } from "@/api/api";
import { CategoriesGetListDocument } from "@/gql/graphql";

const Navigation = async () => {
	const cart = await getCartFromCookie();
	const calculateItems = () => {
		if (!cart) {
			return 0;
		}
		return cart.items.reduce((total, item) => total + item.quantity, 0);
	};
	const { categories } = await executeGraphql({ query: CategoriesGetListDocument });
	return (
		<div className="fixed z-10 flex w-full  bg-blue-500 opacity-95">
			<div className="container mx-auto flex flex-col items-center justify-between space-x-4 p-4 sm:flex-row">
				<nav className="flex space-x-4 p-4" role="navigation">
					<ActiveLink href="/">Home</ActiveLink>

					<ActiveLink href="/products" exact={false}>
						All
					</ActiveLink>

					{categories.data.map((category) => (
						<ActiveLink
							key={category.id}
							href={("/categories/" + category.slug + "/1") as Route}
							exact={false}
						>
							{category.name}
						</ActiveLink>
					))}
					{/* <li>
						<ActiveLink href="/categories" exact={false}>
							Categories
						</ActiveLink>
					</li> */}
					<SignedIn>
						<ActiveLink href="/orders"> My Orders</ActiveLink>
					</SignedIn>
				</nav>
				<div className="flex items-center gap-3">
					<SearchInput />
					<Link href="/cart" className="intems-center flex gap-1 font-bold text-white">
						<CartIcon />
						{calculateItems() || 0}
					</Link>
					<SignedIn>
						<UserButton userProfileMode="navigation" userProfileUrl="/user-profile" />
					</SignedIn>
					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</div>
		</div>
	);
};

export { Navigation };
