export const detectDogBreed = async (imageUri: string): Promise<string | null> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return null;
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "What breed of dog is in this image? Respond with only the breed name, nothing else. If you're unsure or it's a mix, just give your best guess of the primary breed.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64,
                  },
                },
              ],
            },
          ],
          max_tokens: 50,
        }),
      }
    );

    if (!openaiResponse.ok) {
      console.error("Breed detection failed");
      return null;
    }

    const data = await openaiResponse.json();
    const breed = data.choices[0]?.message?.content?.trim();
    return breed || null;
  } catch (error) {
    console.error("Error detecting breed:", error);
    return null;
  }
};
