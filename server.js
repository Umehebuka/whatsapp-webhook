// ==============================
// ✅ EBL WHATSAPP WEBHOOK SERVER
// ==============================

const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// ---------------------------------------------------
// ✅ WEBHOOK VERIFICATION (Meta Challenge - GET)
// ---------------------------------------------------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Incoming webhook verification request...");
  console.log("Mode:", mode, "Token:", token, "Challenge:", challenge);

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("✅ WEBHOOK VERIFIED SUCCESSFULLY");
    // Must respond with plain text (not JSON)
    res.status(200).set("Content-Type", "text/plain").send(challenge);
  } else {
    console.log("❌ VERIFICATION FAILED: Token mismatch or missing params");
    res.sendStatus(403);
  }
});

// ---------------------------------------------------
// ✅ HANDLE INCOMING WEBHOOK EVENTS (POST)
// ---------------------------------------------------
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming Webhook Payload:");
  console.log(JSON.stringify(req.body, null, 2));
  // Always respond with 200 quickly to stop Meta retries
  res.sendStatus(200);
});

// ---------------------------------------------------
// ✅ ROOT ENDPOINT (for quick health check)
// ---------------------------------------------------
app.get("/", (req, res) => {
  res
    .status(200)
    .send("✅ EBL WhatsApp webhook is running and ready for verification!");
});

// ---------------------------------------------------
// ✅ START SERVER
// ---------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
