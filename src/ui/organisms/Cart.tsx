import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { RemoveItemBtn } from "@/ui/atoms/RemoveItemBtn";
import { ItemQuantityManager } from "@/ui/atoms/ItemQuantityManager";
import { getCartFromCookie } from "@/api/api";

export enum CartType {
	MODAL = 1,
	PAGE = 2,
}

const Cart = async ({ type }: { type: CartType }) => {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
		// return <div>Your cart is empty</div>;
	}

	const cart = await getCartFromCookie();

	if (!cart || cart.items.length < 1) {
		redirect("/");
		// return <div>Your cart is empty</div>;
	}

	const calculateTotalPrice = () => {
		return cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>

			{cart.items.map((cartItem) => (
				<div key={cartItem.product.id} className="mb-3 flex items-center rounded-xl bg-white p-4">
					<Image
						src={cartItem.product.images[0].url}
						alt={cartItem.product.images[0].alt}
						width={120}
						height={120}
						className="mr-4 h-28 w-28 object-cover"
					/>
					<div className="">
						<p className="text-xl font-black">{cartItem.product.name}</p>
						<p className="font-bold">
							Price: <span className="text-green-800">{cartItem.product.price / 100} zł</span>
						</p>
						<div className="flex flex-col gap-3 font-bold sm:flex-row sm:items-center">
							Quantity:
							{type === CartType.PAGE && (
								<ItemQuantityManager
									cartId={cart.id}
									quantity={cartItem.quantity}
									productId={cartItem.product.id}
								/>
							)}
							{type === CartType.MODAL && cartItem.quantity}
						</div>
						{type === CartType.PAGE && (
							<div className="mt-2 flex space-x-2">
								<RemoveItemBtn cartId={cart.id} productId={cartItem.product.id} />
							</div>
						)}
					</div>
				</div>
			))}

			<div className="mt-4 flex items-center justify-between">
				<p className="font-bold text-green-800">Total: {calculateTotalPrice() / 100} zł</p>
				<Link href="/payment" className="rounded bg-green-500 px-4 py-2 text-white">
					Pay
				</Link>
			</div>
		</div>
	);
};

export { Cart };
