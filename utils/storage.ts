import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  USER_SETTINGS: "@puppytime/user_settings",
  TRANSFORMATIONS: "@puppytime/transformations",
};

export interface UserSettings {
  displayName: string;
  theme: "light" | "dark" | "system";
  autoSave: boolean;
  imageQuality: "standard" | "high";
}

export interface Transformation {
  id: string;
  originalUri: string;
  transformedUri: string;
  timestamp: number;
}

export const getUserSettings = async (): Promise<UserSettings | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading user settings:", error);
    return null;
  }
};

export const saveUserSettings = async (
  settings: UserSettings
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_SETTINGS,
      JSON.stringify(settings)
    );
  } catch (error) {
    console.error("Error saving user settings:", error);
  }
};

export const getTransformations = async (): Promise<Transformation[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSFORMATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading transformations:", error);
    return [];
  }
};

export const saveTransformation = async (
  transformation: Transformation
): Promise<void> => {
  try {
    const transformations = await getTransformations();
    transformations.unshift(transformation);
    await AsyncStorage.setItem(
      STORAGE_KEYS.TRANSFORMATIONS,
      JSON.stringify(transformations.slice(0, 50))
    );
  } catch (error) {
    console.error("Error saving transformation:", error);
  }
};
