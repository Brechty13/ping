const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook/ping-servers', async (req, res) => {
  try {
    const response = await fetch("https://rifter.gg/api/data", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kl-saas-ajax-request": "Ajax_Request",
        "Referer": "https://rifter.gg/servers"
      },
      method: "GET"
    });

    const data = await response.json();
    console.log("Server response:", data);

    res.status(200).json({ message: "Ping sent successfully.", data });
  } catch (error) {
    console.error("Ping failed:", error);
    res.status(500).json({ error: "Ping failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});
