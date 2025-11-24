import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Image, Pressable, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { getTransformations, Transformation } from "@/utils/storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GalleryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Gallery">;

export default function GalleryScreen() {
  const navigation = useNavigation<GalleryScreenNavigationProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransformations();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.goBack();
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Feather name="x" size={24} color={theme.text} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  const loadTransformations = async () => {
    const stored = await getTransformations();
    setTransformations(stored);
    setLoading(false);
  };

  const openTransformation = (item: Transformation) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Results", {
      originalUri: item.originalUri,
      transformedUri: item.transformedUri,
    });
  };

  const renderItem = ({ item }: { item: Transformation }) => (
    <Pressable
      onPress={() => openTransformation(item)}
      style={({ pressed }) => [
        styles.gridItem,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Image
        source={{ uri: item.transformedUri }}
        style={[styles.thumbnail, { borderColor: theme.primary }]}
        resizeMode="cover"
      />
      <ThemedText
        style={[
          styles.dateText,
          Typography.caption,
          { color: theme.textSecondary },
        ]}
      >
        {new Date(item.timestamp).toLocaleDateString()}
      </ThemedText>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Feather name="image" size={64} color={theme.textSecondary} />
      <ThemedText
        style={[
          styles.emptyText,
          Typography.body,
          { color: theme.textSecondary, marginTop: Spacing.xl },
        ]}
      >
        No transformations yet
      </ThemedText>
      <ThemedText
        style={[
          styles.emptySubtext,
          Typography.caption,
          { color: theme.textSecondary, marginTop: Spacing.sm },
        ]}
      >
        Transform a photo to see it here
      </ThemedText>
    </View>
  );

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ThemedText style={[Typography.body, { color: theme.textSecondary }]}>
            Loading gallery...
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={transformations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  gridItem: {
    width: "48%",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    marginBottom: Spacing.xs,
  },
  dateText: {
    textAlign: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    textAlign: "center",
  },
  emptySubtext: {
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
