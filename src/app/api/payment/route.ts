/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest): Promise<Response> {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return new Response("No webhook secret", { status: 500 });
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		return new Response("No Stripe secret key", { status: 500 });
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = req.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 400 });
	}

	const event = stripe.webhooks.constructEvent(
		await req.text(),
		signature,
		webhookSecret,
	) as Stripe.DiscriminatedEvent;

	console.log(event);
	switch (event.type) {
		case "payment_intent.amount_capturable_updated":
			const _paymentIntentAmountCapturableUpdated = event.data.object;
			// Then define and call a function to handle the event payment_intent.amount_capturable_updated
			break;
		case "payment_intent.canceled":
			const _paymentIntentCanceled = event.data.object;
			// Then define and call a function to handle the event payment_intent.canceled
			break;
		case "payment_intent.created":
			const _paymentIntentCreated = event.data.object;
			// Then define and call a function to handle the event payment_intent.created
			break;
		case "payment_intent.partially_funded":
			const _paymentIntentPartiallyFunded = event.data.object;
			// Then define and call a function to handle the event payment_intent.partially_funded
			break;
		case "payment_intent.payment_failed":
			const _paymentIntentPaymentFailed = event.data.object;
			// Then define and call a function to handle the event payment_intent.payment_failed
			break;
		case "payment_intent.processing":
			const _paymentIntentProcessing = event.data.object;
			// Then define and call a function to handle the event payment_intent.processing
			break;
		case "payment_intent.requires_action":
			const _paymentIntentRequiresAction = event.data.object;
			// Then define and call a function to handle the event payment_intent.requires_action
			break;
		case "payment_intent.succeeded":
			const _paymentIntentSucceeded = event.data.object;
			// Then define and call a function to handle the event payment_intent.succeeded
			break;
		// ... handle other event types
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(null, { status: 204 });
}
