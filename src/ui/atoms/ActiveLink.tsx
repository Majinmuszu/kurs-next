"use client";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkType = {
	children: string;
	href: Route;
	exact?: boolean;
};

const ActiveLink = ({ children, href, exact = true }: ActiveLinkType) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href as string);
	return (
		<Link
			href={href}
			aria-current={isActive}
			className={clsx(`text-white transition duration-300 hover:text-gray-300`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
