import ActiveLink from "@/ui/atoms/ActiveLink";
import React from "react";

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
			</ul>
		</nav>
	);
};

export default Navigation;
