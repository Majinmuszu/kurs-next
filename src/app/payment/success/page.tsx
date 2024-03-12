"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { deleteCookie } from "@/api/actions";

const SuccessPaymentPage = ({
	searchParams,
}: {
	searchParams: { redirect_status: string; payment_intent: string };
}) => {
	useEffect(() => {
		async function handleCookieDelete() {
			await deleteCookie();
		}
		if (searchParams.redirect_status === "succeeded") {
			handleCookieDelete().catch((e) => console.error(e));
		}
	}, [searchParams.redirect_status]);

	switch (searchParams.redirect_status) {
		case "succeeded":
			return (
				<div className="mx-auto mt-9 ">
					<p className="text-center text-5xl font-medium ">
						Payment status:{" "}
						<span className="font-bold text-green-600 first-letter:capitalize">
							{searchParams.redirect_status}
						</span>
					</p>
					<Link href="/" className="mt-4 block text-center text-2xl text-blue-500 underline">
						Go to Homepage
					</Link>
				</div>
			);
		case "failed":
			return (
				<div className="mx-auto mt-9 ">
					<p className="text-center text-5xl font-medium">
						Payment status:{" "}
						<span className="font-bold text-red-600 first-letter:capitalize">
							{searchParams.redirect_status}
						</span>
					</p>
					<Link href="/payment" className="mt-4 block text-center text-2xl text-blue-500 underline">
						Try again
					</Link>
				</div>
			);
	}
	return <div>{searchParams.redirect_status}</div>;
};

export default SuccessPaymentPage;
