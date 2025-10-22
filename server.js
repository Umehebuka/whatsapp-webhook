const express = require("express");
const app = express();
app.use(express.json());

// ✅ Verify webhook (Meta challenge)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// ✅ Handle incoming webhook messages (POST)
app.post("/webhook", (req, res) => {
  console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("EBL WhatsApp webhook is running!");
});

// ✅ Listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
