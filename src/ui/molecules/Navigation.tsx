import React from "react";
import {ActiveLink} from "@/ui/atoms/ActiveLink";

const Navigation = () => {
	return (
		<nav className="fixed z-10 w-full bg-blue-500 opacity-95" role="navigation">
			<ul className="container mx-auto flex space-x-4 p-4">
				<li>
					<ActiveLink href="/">Home</ActiveLink>
				</li>
				<li>
					<ActiveLink href="/products" exact={false}>
						All
					</ActiveLink>
				</li>
				<li>
					<ActiveLink href="/categories" exact={false}>
						Categories
					</ActiveLink>
				</li>
				<li>
					<ActiveLink href="/collections" exact={false}>
						Collections
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};

export {Navigation};
