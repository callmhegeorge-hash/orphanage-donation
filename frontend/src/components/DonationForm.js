import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/donations", {
                name, email, amount, token: paymentMethod
            });
            setMessage("Donation successful! Thank you.");
            setName(""); setEmail(""); setAmount("");
        } catch (err) {
            setMessage(err.response?.data?.error || "Payment failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="number" placeholder="Amount USD" value={amount} onChange={e => setAmount(e.target.value)} required />
            <CardElement />
            <button type="submit" disabled={!stripe}>Donate</button>
            <p>{message}</p>
        </form>
    );
};

const DonationForm = () => (
    <Elements stripe={stripePromise}>
        <Form />
    </Elements>
);

export default DonationForm;
