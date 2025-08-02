app.post('/webhook/ping-servers', async (req, res) => {
  try {
    const response = await fetch("https://rifter.gg/api/data", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        // ... your other headers
      },
      method: "GET"
    });

    const data = await response.json();
    console.log("Server response:", data);

    // Send a Discord message
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
            description: "Data was fetched and everything is working.",
            color: 65280
          }
        ]
      })
    });

    res.status(200).json({ message: "Ping sent and Discord notified.", data });
  } catch (error) {
    console.error("Ping failed:", error);
    res.status(500).json({ error: "Ping failed." });
  }
});
