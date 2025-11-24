interface TransformImageParams {
  imageUri: string;
  quality: "standard" | "high";
}

export const transformToPuppy = async ({
  imageUri,
  quality,
}: TransformImageParams): Promise<string> => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64.split(",")[1],
          prompt:
            "Transform this adult dog into a cute puppy version, maintaining the same breed characteristics, fur color, and facial features but making it younger, smaller, and more playful looking with big eyes and softer features",
          n: 1,
          size: quality === "high" ? "1024x1024" : "512x512",
        }),
      }
    );

    if (!openaiResponse.ok) {
      throw new Error("Failed to transform image");
    }

    const data = await openaiResponse.json();
    return data.data[0].url;
  } catch (error) {
    console.error("Error transforming image:", error);
    throw error;
  }
};
