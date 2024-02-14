"use client";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkType = {
	children: string;
	href: Route;
};

const ActiveLink = ({ children, href }: ActiveLinkType) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={clsx(`text-white transition duration-300 hover:text-gray-300`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
