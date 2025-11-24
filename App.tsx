import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RootStackNavigator from "@/navigation/RootStackNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function App() {
  return (
  <ErrorBoundary>
    <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <SettingsProvider>
              <NavigationContainer>
                <RootStackNavigator />
              </NavigationContainer>
              <StatusBar style="auto" />
            </SettingsProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
  </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
