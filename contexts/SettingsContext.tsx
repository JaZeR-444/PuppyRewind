import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserSettings, saveUserSettings, UserSettings } from "@/utils/storage";

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
  displayName: "Dog Lover",
  theme: "system",
  autoSave: true,
  imageQuality: "standard",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: async () => {},
  isLoading: true,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const stored = await getUserSettings();
    if (stored) {
      setSettings(stored);
    }
    setIsLoading(false);
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await saveUserSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
