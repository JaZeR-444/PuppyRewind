import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Image, Pressable, ActionSheetIOS, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("Gallery");
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Feather name="image" size={24} color={theme.text} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate("Settings");
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Feather name="settings" size={24} color={theme.text} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const handleChoosePhoto = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Take Photo", "Choose from Library", "Cancel"],
          cancelButtonIndex: 2,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            await openCamera();
          } else if (buttonIndex === 1) {
            await openImagePicker();
          }
        }
      );
    } else {
      Alert.alert(
        "Choose Photo",
        "Select an option",
        [
          {
            text: "Take Photo",
            onPress: openCamera,
          },
          {
            text: "Choose from Library",
            onPress: openImagePicker,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera permission is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate("Processing", { imageUri: result.assets[0].uri });
    }
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Photo library permission is required to choose photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate("Processing", { imageUri: result.assets[0].uri });
    }
  };

  return (
    <ScreenScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <ThemedText style={[styles.headline, Typography.h1]}>
            Turn Back Time
          </ThemedText>
          
          <ThemedText
            style={[
              styles.subheadline,
              Typography.body,
              { color: theme.textSecondary },
            ]}
          >
            See what your adult dog looked like as a puppy
          </ThemedText>

          <Image
            source={require("@/assets/images/empty-state.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          <ThemedView style={styles.infoSection}>
            <ThemedText style={[styles.infoTitle, Typography.h3]}>
              How it works
            </ThemedText>
            
            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: theme.primary },
                ]}
              >
                <ThemedText style={styles.stepNumberText}>1</ThemedText>
              </View>
              <ThemedText style={[styles.stepText, Typography.body]}>
                Choose a photo of your adult dog
              </ThemedText>
            </View>

            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: theme.primary },
                ]}
              >
                <ThemedText style={styles.stepNumberText}>2</ThemedText>
              </View>
              <ThemedText style={[styles.stepText, Typography.body]}>
                AI transforms the image to show puppy features
              </ThemedText>
            </View>

            <View style={styles.step}>
              <View
                style={[
                  styles.stepNumber,
                  { backgroundColor: theme.primary },
                ]}
              >
                <ThemedText style={styles.stepNumberText}>3</ThemedText>
              </View>
              <ThemedText style={[styles.stepText, Typography.body]}>
                View before and after, then save to your photos
              </ThemedText>
            </View>
          </ThemedView>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              paddingBottom: insets.bottom + Spacing.xl,
            },
          ]}
        >
          <PrimaryButton
            title="Choose Photo"
            icon="camera"
            onPress={handleChoosePhoto}
          />
        </View>
      </ThemedView>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing["2xl"],
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.xl,
  },
  headline: {
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  subheadline: {
    marginBottom: Spacing["3xl"],
    textAlign: "center",
  },
  illustration: {
    width: "100%",
    height: 200,
    marginBottom: Spacing["3xl"],
  },
  infoSection: {
    width: "100%",
    marginBottom: Spacing["4xl"],
  },
  infoTitle: {
    marginBottom: Spacing.xl,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  stepText: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
});

