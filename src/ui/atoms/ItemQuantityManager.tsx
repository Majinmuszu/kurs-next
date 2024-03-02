"use client";
import React, { useOptimistic } from "react";
import { changeItemQuantity } from "@/api/actions";

type Props = {
	quantity: number;
	productId: string;
	cartId: string;
};

const ItemQuantityManager = ({ quantity, productId, cartId }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex items-center gap-3 font-bold">
			<button
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(productId, optimisticQuantity - 1, cartId);
				}}
				disabled={optimisticQuantity === 1}
				data-testid="decrement"
				className="rounded bg-blue-200 px-3 py-1 disabled:cursor-not-allowed disabled:bg-gray-500"
			>
				-
			</button>
			<p data-testid="quantity">{optimisticQuantity}</p>
			<button
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(productId, optimisticQuantity + 1, cartId);
				}}
				data-testid="increment"
				className="rounded bg-blue-200 px-3 py-1"
			>
				+
			</button>
		</form>
	);
};

export { ItemQuantityManager };
