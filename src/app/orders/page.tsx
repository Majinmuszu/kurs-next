import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { type OrderStatus, OrdersGetListByEmailDocument } from "@/gql/graphql";
import { executeGraphql } from "@/api/api";
type OrderLine = {
	productId: string;
	productName: string;
	productQuantity: number;
	productPrice: number;
};
type Order = {
	createdAt: unknown;
	id: string;
	lines: unknown;
	status: OrderStatus;
	totalAmount: number;
	updatedAt: unknown;
};
const compareDates = (a: Order, b: Order) => {
	const dateA = new Date(a.createdAt as string);
	const dateB = new Date(b.createdAt as string);
	return dateB.getTime() - dateA.getTime();
};
const Orders = async () => {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}
	const { orders } = await executeGraphql({
		query: OrdersGetListByEmailDocument,
		variables: { email: email },
		next: { tags: ["order"] },
	});

	return (
		<>
			{orders.data.length === 1 ? (
				<div className="mb-8 text-3xl font-bold">You do not have any orders yet</div>
			) : (
				<div className="container mx-auto p-4">
					<h1 className="mb-8 text-3xl font-bold">Hi {user?.firstName} Here Are Your Orders</h1>
					{orders.data.sort(compareDates).map((order) => (
						<div key={order.id} className="mb-8 rounded-md border bg-white p-4 shadow-md">
							<p className="mb-2 text-lg font-semibold text-indigo-700">Order ID: {order.id}</p>
							<p className="mb-2 text-gray-600">Date: {order.createdAt as string}</p>
							<p className="mb-4 text-gray-600">Total: ${order.totalAmount / 100}</p>
							<h2 className="mb-2 text-xl font-bold">Items</h2>
							<ul>
								{(order.lines as OrderLine[]).map((item) => (
									<li
										key={item.productId}
										className="flex items-center justify-between border-b py-2 last:border-b-0"
									>
										<span className="flex-grow text-gray-800">{item.productName}</span>
										<span className="mr-4">Quantity: {item.productQuantity}</span>
										<span className="text-green-700">Price: ${item.productPrice / 100}</span>
									</li>
								))}
							</ul>
						</div>
					))}
					{/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
				</div>
			)}
		</>
	);
};

export default Orders;
