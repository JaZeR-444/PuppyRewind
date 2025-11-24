import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Image, Pressable, Alert, Share } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";

import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/contexts/SettingsContext";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type ResultsScreenRouteProp = RouteProp<RootStackParamList, "Results">;
type ResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Results">;

export default function ResultsScreen() {
  const route = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const { theme } = useTheme();
  const { settings } = useSettings();
  const [showBefore, setShowBefore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [selectedAge, setSelectedAge] = useState<number>(3);
  const [regenerating, setRegenerating] = useState(false);
  const [currentTransformedUri, setCurrentTransformedUri] = useState("");

  const { originalUri, transformedUri, ageMonths } = route.params;

  useEffect(() => {
    setCurrentTransformedUri(transformedUri);
    if (ageMonths) {
      setSelectedAge(ageMonths);
    }
  }, [transformedUri, ageMonths]);

  useEffect(() => {
    if (settings.autoSave && !autoSaved && currentTransformedUri) {
      autoSaveImage();
    }
  }, [settings.autoSave, autoSaved, currentTransformedUri]);

  const autoSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(currentTransformedUri);
        setAutoSaved(true);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  const handleAgeChange = async (newAge: number) => {
    if (newAge === selectedAge || regenerating) return;
    
    setRegenerating(true);
    setSelectedAge(newAge);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.navigate("Processing", {
      imageUri: originalUri,
      ageMonths: newAge,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleShare}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Feather name="share" size={24} color={theme.text} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: "Check out my dog as a puppy! Created with PuppyTime 🐶",
        url: currentTransformedUri,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSaveToPhotos = async () => {
    setSaving(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Photo library permission is required to save images."
        );
        setSaving(false);
        return;
      }

      await MediaLibrary.saveToLibraryAsync(currentTransformedUri);
      
      Alert.alert(
        "Saved!",
        "The puppy image has been saved to your photo library.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save image to photo library.");
    }
    setSaving(false);
  };

  const handleTryAnother = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Home");
  };

  return (
    <ScreenScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.toggleContainer}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowBefore(true);
            }}
            style={[
              styles.toggleButton,
              {
                backgroundColor: showBefore
                  ? theme.primary
                  : theme.backgroundSecondary,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.toggleText,
                Typography.button,
                {
                  color: showBefore ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              Before
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowBefore(false);
            }}
            style={[
              styles.toggleButton,
              {
                backgroundColor: !showBefore
                  ? theme.primary
                  : theme.backgroundSecondary,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.toggleText,
                Typography.button,
                {
                  color: !showBefore ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              After
            </ThemedText>
          </Pressable>
        </View>

        <Image
          source={{ uri: showBefore ? originalUri : currentTransformedUri }}
          style={[styles.image, { borderColor: theme.primary }]}
          resizeMode="cover"
        />

        <View style={styles.ageSliderContainer}>
          <ThemedText style={[styles.ageLabel, Typography.caption, { color: theme.textSecondary }]}>
            Puppy Age
          </ThemedText>
          <View style={styles.ageButtons}>
            {[2, 3, 4, 6].map((age) => (
              <Pressable
                key={age}
                onPress={() => handleAgeChange(age)}
                style={[
                  styles.ageButton,
                  {
                    backgroundColor: selectedAge === age ? theme.primary : theme.backgroundSecondary,
                  },
                ]}
                disabled={regenerating}
              >
                <ThemedText
                  style={[
                    styles.ageButtonText,
                    Typography.caption,
                    {
                      color: selectedAge === age ? "#FFFFFF" : theme.text,
                    },
                  ]}
                >
                  {age}mo
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Save to Photos"
            icon="download"
            onPress={handleSaveToPhotos}
            loading={saving}
          />

          <View style={styles.spacer} />

          <PrimaryButton
            title="Try Another Photo"
            icon="camera"
            variant="secondary"
            onPress={handleTryAnother}
          />
        </View>

        <ThemedText
          style={[
            styles.disclaimer,
            Typography.caption,
            { color: theme.textSecondary },
          ]}
        >
          AI-generated image may vary from actual puppy appearance
        </ThemedText>
      </ThemedView>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  toggleButton: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    borderWidth: 3,
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    marginBottom: Spacing.xl,
  },
  spacer: {
    height: Spacing.md,
  },
  disclaimer: {
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  ageSliderContainer: {
    marginBottom: Spacing.xl,
  },
  ageLabel: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  ageButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  ageButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    minWidth: 60,
  },
  ageButtonText: {
    textAlign: "center",
  },
});
