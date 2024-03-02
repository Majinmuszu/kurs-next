"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CartModalOverlay = () => {
	const router = useRouter();
	const onClose = () => {
		router.back();
	};
	return (
		<div
			aria-label="close cart modal"
			className="fixed inset-0 z-50 bg-black bg-opacity-50"
			onClick={onClose}
		></div>
	);
};

export { CartModalOverlay };
