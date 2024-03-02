import React from "react";
import { type Metadata } from "next/types";
import { Cart, CartType } from "@/ui/organisms/Cart";
export const metadata: Metadata = {
	title: "Cart",
	description: "My awesome cart in my awesome szop.",
};
const CartPage = async () => {
	return <Cart type={CartType.PAGE} />;
};

export default CartPage;
