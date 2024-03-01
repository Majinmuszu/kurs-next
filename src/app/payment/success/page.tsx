import Link from "next/link";
import React from "react";

// payment_intent=pi_3Ope9rEEpw3andLW1pKe6HdJ&payment_intent_client_secret=pi_3Ope9rEEpw3andLW1pKe6HdJ_secret_PiQKxfUcvMV5KxKXnw5sgzH3F&redirect_status=succeeded
const SuccessPaymentPage = ({ searchParams }: { searchParams: { redirect_status: string } }) => {
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
