"use client";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "@/api/actions";

type RemoveItemBtnProps = {
	cartId: string;
	productId: string;
};

const RemoveItemBtn = ({ cartId, productId }: RemoveItemBtnProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	return (
		<button
			onClick={() =>
				startTransition(async () => {
					await removeItem(cartId, productId);
					router.refresh();
				})
			}
			className="rounded bg-red-500 px-2 py-1 text-white disabled:cursor-wait disabled:bg-red-200"
			disabled={isPending}
		>
			Remove
		</button>
	);
};

export { RemoveItemBtn };
