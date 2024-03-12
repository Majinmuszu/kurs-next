import { redirect } from "next/navigation";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { getCartFromCookie } from "@/api/api";
import { StripeForm } from "@/ui/organisms/StripeForm";

export default async function PaymentPage() {
	const cart = await getCartFromCookie();

	if (!cart || cart.items.length < 1) {
		redirect("/");
	}
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		redirect("/sign-in");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const totalAmount = cart.items.reduce((acc, item) => acc + (item.product?.price ?? 0), 0);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalAmount,
		currency: "pln",
		automatic_payment_methods: {
			enabled: true,
			allow_redirects: "always",
		},
		metadata: {
			orderId: cart.id,
			userEmail: email,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error("Missing client_secret");
	}

	return <StripeForm clientSecret={paymentIntent.client_secret} cart={cart} />;
}
