import React from "react";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/atoms/SearchInput";

const Navigation = () => {
	return (
		<nav className="fixed z-10 flex w-full  bg-blue-500 opacity-95" role="navigation">
			<div className="container mx-auto flex items-center justify-between space-x-4 p-4">
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
				</ul>
				<SearchInput />
			</div>
		</nav>
	);
};

export { Navigation };
