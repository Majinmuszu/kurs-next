"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CartModalClose = () => {
	const router = useRouter();
	const onClose = () => {
		router.back();
	};
	const onReload = () => {
		window.location.reload();
	};
	return (
		<div className="flex items-center justify-between p-4">
			<button onClick={onReload} className="text-lg text-blue-500">
				Open Cart
			</button>
			<button className="text-xl" onClick={onClose}>
				&#10006;
			</button>
		</div>
	);
};

export { CartModalClose };
