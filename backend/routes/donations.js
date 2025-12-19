const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Donation = require("../models/Donation");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Get all donations
router.get("/", async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create donation and stripe payment
router.post("/", async (req, res) => {
    const { name, email, amount, token } = req.body;
    try {
        const charge = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method: token.id,
            confirm: true,
            receipt_email: email,
        });

        const donation = new Donation({ name, email, amount });
        await donation.save();

        res.json({ success: true, donation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
