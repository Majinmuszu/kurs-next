"use client";

import { useFormStatus } from "react-dom";

export function AddToCartButton() {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			disabled={status.pending}
			className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 hover:shadow-lg disabled:cursor-wait disabled:bg-slate-500"
		>
			Add to cart
		</button>
	);
}
