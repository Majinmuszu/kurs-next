import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCartFromCookie } from "@/api/api";
import { ItemQuantityManager } from "@/ui/atoms/ItemQuantityManager";

const CartPage = async () => {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
		// return <div>Your cart is empty</div>;
	}

	const res = await getCartFromCookie();

	if (res.items.length < 1) {
		redirect("/");
		// return <div>Your cart is empty</div>;
	}

	const calculateTotalPrice = () => {
		return res.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
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

			{res.items.map((cartItem) => (
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
							Price: <span className="text-green-800">${cartItem.product.price / 100}</span>
						</p>
						<div className="flex flex-col gap-3 font-bold sm:flex-row sm:items-center">
							Quantity:
							<ItemQuantityManager
								cartId={res.id}
								quantity={cartItem.quantity}
								productId={cartItem.product.id}
							/>
						</div>
						<div className="mt-2 flex space-x-2">
							<button
								// onClick={() => handleRemoveItem(cartItem.product.id)}
								className="rounded bg-red-500 px-2 py-1 text-white"
							>
								Remove
							</button>
						</div>
					</div>
				</div>
			))}

			<div className="mt-4 flex items-center justify-between">
				<p className="font-bold text-green-800">Total: ${calculateTotalPrice() / 100}</p>
				<button
					// onClick={handlePay}
					className="rounded bg-green-500 px-4 py-2 text-white"
				>
					Pay
				</button>
			</div>
		</div>
	);
};

export default CartPage;
