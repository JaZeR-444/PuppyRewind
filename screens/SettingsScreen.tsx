import React, { useState } from "react";
import { View, StyleSheet, Image, Switch, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/contexts/SettingsContext";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();
  const { settings, updateSettings } = useSettings();
  const [displayName, setDisplayName] = useState(settings.displayName);

  const handleSaveDisplayName = () => {
    if (displayName.trim()) {
      updateSettings({ displayName: displayName.trim() });
    }
  };

  const toggleAutoSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateSettings({ autoSave: !settings.autoSave });
  };

  const selectQuality = (quality: "standard" | "high") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateSettings({ imageQuality: quality });
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={require("@/assets/images/profile-avatar.png")}
            style={styles.avatar}
            resizeMode="contain"
          />
          <ThemedText
            style={[styles.displayName, Typography.h3]}
            onPress={() => {}}
          >
            {settings.displayName}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, Typography.h4]}>
            Preferences
          </ThemedText>

          <View
            style={[
              styles.settingRow,
              { backgroundColor: theme.backgroundDefault },
            ]}
          >
            <View style={styles.settingInfo}>
              <ThemedText style={[styles.settingLabel, Typography.body]}>
                Auto-save to Gallery
              </ThemedText>
              <ThemedText
                style={[
                  styles.settingDescription,
                  Typography.caption,
                  { color: theme.textSecondary },
                ]}
              >
                Automatically save transformed images
              </ThemedText>
            </View>
            <Switch
              value={settings.autoSave}
              onValueChange={toggleAutoSave}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View
            style={[
              styles.settingRow,
              { backgroundColor: theme.backgroundDefault },
            ]}
          >
            <View style={styles.settingInfo}>
              <ThemedText style={[styles.settingLabel, Typography.body]}>
                Image Quality
              </ThemedText>
              <ThemedText
                style={[
                  styles.settingDescription,
                  Typography.caption,
                  { color: theme.textSecondary },
                ]}
              >
                Higher quality takes longer to process
              </ThemedText>
            </View>
          </View>

          <View style={styles.qualityOptions}>
            <Pressable
              onPress={() => selectQuality("standard")}
              style={[
                styles.qualityButton,
                {
                  backgroundColor:
                    settings.imageQuality === "standard"
                      ? theme.primary
                      : theme.backgroundSecondary,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.qualityText,
                  Typography.button,
                  {
                    color:
                      settings.imageQuality === "standard"
                        ? "#FFFFFF"
                        : theme.text,
                  },
                ]}
              >
                Standard
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => selectQuality("high")}
              style={[
                styles.qualityButton,
                {
                  backgroundColor:
                    settings.imageQuality === "high"
                      ? theme.primary
                      : theme.backgroundSecondary,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.qualityText,
                  Typography.button,
                  {
                    color:
                      settings.imageQuality === "high"
                        ? "#FFFFFF"
                        : theme.text,
                  },
                ]}
              >
                High
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, Typography.h4]}>
            About
          </ThemedText>

          <Pressable
            style={[
              styles.settingRow,
              { backgroundColor: theme.backgroundDefault },
            ]}
            onPress={() => {}}
          >
            <ThemedText style={[styles.settingLabel, Typography.body]}>
              Privacy Policy
            </ThemedText>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </Pressable>

          <Pressable
            style={[
              styles.settingRow,
              { backgroundColor: theme.backgroundDefault },
            ]}
            onPress={() => {}}
          >
            <ThemedText style={[styles.settingLabel, Typography.body]}>
              Terms of Service
            </ThemedText>
            <Feather name="chevron-right" size={20} color={theme.textSecondary} />
          </Pressable>

          <View
            style={[
              styles.settingRow,
              { backgroundColor: theme.backgroundDefault },
            ]}
          >
            <ThemedText style={[styles.settingLabel, Typography.body]}>
              Version
            </ThemedText>
            <ThemedText
              style={[Typography.body, { color: theme.textSecondary }]}
            >
              1.0.0
            </ThemedText>
          </View>
        </View>

        <ThemedText
          style={[
            styles.note,
            Typography.caption,
            { color: theme.textSecondary },
          ]}
        >
          Note: This app requires an OpenAI API key to transform images. The key
          should be set as EXPO_PUBLIC_OPENAI_API_KEY in your environment
          variables.
        </ThemedText>
      </ThemedView>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  },
  displayName: {
    textAlign: "center",
  },
  section: {
    marginBottom: Spacing["3xl"],
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  settingInfo: {
    flex: 1,
    marginRight: Spacing.lg,
  },
  settingLabel: {
    marginBottom: Spacing.xs,
  },
  settingDescription: {},
  qualityOptions: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  qualityButton: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  qualityText: {
    textAlign: "center",
  },
  note: {
    textAlign: "center",
    paddingVertical: Spacing.xl,
  },
});
