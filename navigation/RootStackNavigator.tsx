import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import ProcessingScreen from "@/screens/ProcessingScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import GalleryScreen from "@/screens/GalleryScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type RootStackParamList = {
  Home: undefined;
  Processing: { imageUri: string; ageMonths?: number };
  Results: { originalUri: string; transformedUri: string; ageMonths?: number };
  Settings: undefined;
  Gallery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderTitle title="PuppyTime" />,
        }}
      />
      <Stack.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{
          headerTitle: "Creating Magic...",
          ...getCommonScreenOptions({ theme, isDark, transparent: false }),
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          headerTitle: "Your Puppy",
          ...getCommonScreenOptions({ theme, isDark, transparent: false }),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: "modal",
          headerTitle: "Settings",
          ...getCommonScreenOptions({ theme, isDark, transparent: false }),
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          presentation: "modal",
          headerTitle: "Gallery",
          ...getCommonScreenOptions({ theme, isDark, transparent: false }),
        }}
      />
    </Stack.Navigator>
  );
}
