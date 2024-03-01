import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCartFromCookie } from "@/api/api";
import { ItemQuantityManager } from "@/ui/atoms/ItemQuantityManager";
import { RemoveItemBtn } from "@/ui/atoms/RemoveItemBtn";

const CartPage = async () => {
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

	// const handleIncreaseQuantity = (itemId: string) => {
	// 	console.log(`Increase quantity for item ${itemId}`);
	// };

	// const handleDecreaseQuantity = (itemId: string) => {
	// 	console.log(`Decrease quantity for item ${itemId}`);
	// };

	// const handleRemoveItem = (itemId: string) => {
	// 	console.log(`Remove item ${itemId}`);
	// };

	// const handlePay = () => {
	// 	console.log("Processing payment");
	// };

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
							<ItemQuantityManager
								cartId={cart.id}
								quantity={cartItem.quantity}
								productId={cartItem.product.id}
							/>
						</div>
						<div className="mt-2 flex space-x-2">
							<RemoveItemBtn cartId={cart.id} productId={cartItem.product.id} />
						</div>
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

export default CartPage;
