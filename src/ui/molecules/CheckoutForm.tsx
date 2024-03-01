"use client";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, type FormEvent } from "react";

// eslint-disable-next-line import/no-unresolved
import "./stripe.css";
import Image from "next/image";

type CheckoutProps = {
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

export function CheckoutForm({ cart }: { cart: CheckoutProps }) {
	const calculateTotalPrice = () => {
		return cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
	};
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret",
		);

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case "succeeded":
						setMessage("Payment succeeded!");
						break;
					case "processing":
						setMessage("Your payment is processing.");
						break;
					case "requires_payment_method":
						setMessage("Your payment was not successful, please try again.");
						break;
					default:
						setMessage("Something went wrong.");
						break;
				}
			})
			.catch(console.error);
	}, [stripe]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/payment/success`,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message ?? "Something went wrong");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	} as const;

	return (
		<div className="stripe w-full">
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
						<p className="font-bold">Quantity: {cartItem.quantity}</p>
					</div>
				</div>
			))}

			<form id="payment-form" onSubmit={handleSubmit} className="w-full">
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				<button disabled={isLoading || !stripe || !elements} id="submit" className="mt-4">
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							`Pay now - ${calculateTotalPrice() / 100} zł`
						)}
					</span>
				</button>
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
}
