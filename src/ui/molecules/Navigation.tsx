import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/atoms/SearchInput";
import { CartIcon } from "@/ui/icons/CartIcon";
import { getCartFromCookie } from "@/api/api";

const Navigation = async () => {
	const cart = await getCartFromCookie();
	const calculateItems = () => {
		if (!cart) {
			return 0;
		}
		return cart.items.reduce((total, item) => total + item.quantity, 0);
	};
	return (
		<nav className="fixed z-10 flex w-full  bg-blue-500 opacity-95" role="navigation">
			<div className="container mx-auto flex flex-col items-center justify-between space-x-4 p-4 sm:flex-row">
				<ul className="flex space-x-4 p-4">
					<li>
						<ActiveLink href="/">Home</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/products" exact={false}>
							All
						</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/collections" exact={false}>
							Collections
						</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/categories" exact={false}>
							Categories
						</ActiveLink>
					</li>
					<SignedIn>
						<li>
							<ActiveLink href="/orders"> My Orders</ActiveLink>
						</li>
					</SignedIn>
				</ul>
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
		</nav>
	);
};

export { Navigation };
