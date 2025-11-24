interface TransformImageParams {
  imageUri: string;
  quality: "standard" | "high";
  breed?: string;
  ageMonths?: number;
}

export const transformToPuppy = async ({
  imageUri,
  quality,
  breed,
  ageMonths = 3,
}: TransformImageParams): Promise<string> => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const formData = new FormData();
    formData.append("image", blob as any, "dog.jpg");
    formData.append("mask", blob as any, "mask.png");
    
    const breedText = breed ? ` ${breed}` : "";
    const ageText = ageMonths === 2 ? "2-month-old" : ageMonths === 4 ? "4-month-old" : ageMonths === 6 ? "6-month-old" : "3-month-old";
    
    formData.append(
      "prompt",
      `A cute ${ageText}${breedText} puppy with big eyes, soft features, small size, playful appearance, fluffy fur, maintaining the same coat color and breed characteristics`
    );
    formData.append("n", "1");
    formData.append("size", quality === "high" ? "1024x1024" : "512x512");

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      throw new Error(
        errorData.error?.message || "Failed to transform image with AI"
      );
    }

    const data = await openaiResponse.json();
    return data.data[0].url;
  } catch (error) {
    console.error("Error transforming image:", error);
    throw error;
  }
};
