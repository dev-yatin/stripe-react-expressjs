// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
require("dotenv").config({ path: __dirname + "/.env.development" });
console.log("process.env.STRIPE_KEY", process.env.STRIPE_KEY);
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const app = express();
app.use(express.static("public"));
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-checkout-session", async (req, res) => {
  console.log("data");
  const reqBody = req.body;
  const lineItems = reqBody.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    customer: reqBody.customerId,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  console.log("url: ", session.url);

  res.send({ url: session.url });
});

app.listen(4242, () => console.log("Running on port 4242"));
