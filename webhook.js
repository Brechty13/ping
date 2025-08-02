const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route (optioneel, zodat '/' geen error geeft)
app.get('/', (req, res) => {
  res.send("Server is running.");
});

app.post('/webhook/ping-servers', async (req, res) => {
  try {
    const response = await fetch("https://rifter.gg/api/data", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
      },
      method: "GET"
    });

    const data = await response.json();
    console.log("Server response:", data);

    await fetch("https://discord.com/api/webhooks/1401309163010785350/yfRpTvI8t97GqSQwTQqtCC0mAV_ig7xFyraMKh_LgP6hEL3yfMVHXHc-abdzhWTUBOt4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: "✅ Ping successful! Server data received from rifter.gg.",
        embeds: [
          {
            title: "Server Ping",
            description: "Rifter.gg server responded successfully.",
            color: 5763719
          }
        ]
      })
    });

    res.status(200).send("Ping sent successfully.");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});
