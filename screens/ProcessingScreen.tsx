import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/contexts/SettingsContext";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { transformToPuppy } from "@/utils/openai";
import { saveTransformation } from "@/utils/storage";
import { detectDogBreed } from "@/utils/breedDetection";

type ProcessingScreenRouteProp = RouteProp<RootStackParamList, "Processing">;
type ProcessingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Processing">;

export default function ProcessingScreen() {
  const route = useRoute<ProcessingScreenRouteProp>();
  const navigation = useNavigation<ProcessingScreenNavigationProp>();
  const { theme } = useTheme();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Analyzing your dog...");

  const { imageUri, ageMonths } = route.params;

  useEffect(() => {
    processImage();
    
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const processImage = async () => {
    try {
      setStatusText("Detecting dog breed...");
      const breed = await detectDogBreed(imageUri);
      
      setStatusText("Transforming your pup...");
      const transformedUri = await transformToPuppy({
        imageUri,
        quality: settings.imageQuality,
        breed: breed || undefined,
        ageMonths: ageMonths || 3,
      });

      await saveTransformation({
        id: Date.now().toString(),
        originalUri: imageUri,
        transformedUri,
        timestamp: Date.now(),
      });

      navigation.replace("Results", {
        originalUri: imageUri,
        transformedUri,
        ageMonths: ageMonths || 3,
      });
    } catch (error) {
      Alert.alert(
        "Transformation Failed",
        "Unable to transform the image. Please ensure you have set your OpenAI API key and try again.",
        [
          {
            text: "Go to Settings",
            onPress: () => navigation.navigate("Settings"),
          },
          {
            text: "Try Again",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: imageUri }}
          style={[styles.thumbnail, { borderColor: theme.primary }]}
          resizeMode="cover"
        />

        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={styles.loader}
        />

        <ThemedText style={[styles.statusText, Typography.body]}>
          {statusText}
        </ThemedText>

        <ThemedText
          style={[
            styles.estimateText,
            Typography.caption,
            { color: theme.textSecondary },
          ]}
        >
          This usually takes 10-15 seconds
        </ThemedText>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                  backgroundColor: theme.primary,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: BorderRadius.md,
    borderWidth: 3,
    marginBottom: Spacing["3xl"],
  },
  loader: {
    marginBottom: Spacing.xl,
  },
  statusText: {
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  estimateText: {
    textAlign: "center",
    marginBottom: Spacing["3xl"],
  },
  progressContainer: {
    width: "100%",
    maxWidth: 300,
  },
  progressBar: {
    height: 4,
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: BorderRadius.xs,
  },
});
