"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "@/ui/molecules/CheckoutForm";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
	throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
type Cart = {
	id: string;
	items: {
		quantity: number;
		product: {
			id: string;
			name: string;
			price: number;
			images: {
				url: string;
				alt: string;
			}[];
		};
	}[];
};
export const StripeForm = ({ clientSecret, cart }: { clientSecret: string; cart: Cart }) => {
	return (
		<Elements options={{ appearance: { theme: "stripe" }, clientSecret }} stripe={stripePromise}>
			<CheckoutForm cart={cart} />
		</Elements>
	);
};