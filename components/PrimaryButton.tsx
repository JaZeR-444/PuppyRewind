import React from "react";
import { Pressable, StyleSheet, ActivityIndicator, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Feather.glyphMap;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  icon,
  variant = "primary",
  loading = false,
  disabled = false,
}) => {
  const { theme } = useTheme();

  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? theme.primary : "transparent",
          borderColor: theme.primary,
          borderWidth: isPrimary ? 0 : 2,
          opacity: pressed ? 0.7 : disabled || loading ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : theme.primary} />
      ) : (
        <View style={styles.content}>
          {icon ? (
            <Feather
              name={icon}
              size={20}
              color={isPrimary ? "#FFFFFF" : theme.primary}
              style={styles.icon}
            />
          ) : null}
          <ThemedText
            style={[
              styles.text,
              {
                color: isPrimary ? "#FFFFFF" : theme.primary,
              },
            ]}
          >
            {title}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...Typography.button,
  },
  icon: {
    marginRight: Spacing.sm,
  },
});
