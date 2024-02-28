import React from "react";
import { getOrCreateCart } from "@/api/api";

const CartPage = async () => {
	const res = await getOrCreateCart();
	return <pre>{JSON.stringify(res, null, 2)}</pre>;
};

export default CartPage;
