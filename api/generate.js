export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { ingredients } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Du är en professionell kock som skapar tydliga recept på svenska."
          },
          {
            role: "user",
            content: `Skapa ett komplett recept med tydliga steg baserat på dessa ingredienser: ${ingredients}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      text: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
