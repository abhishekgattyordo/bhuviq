import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEFAULT_PORTAL_SETTINGS, PortalSettings, UpdateSettingsInput } from '../types/settings';

interface SettingsContextType {
  settings: PortalSettings;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saveSuccess: boolean;
  updateSettings: (newSettings: UpdateSettingsInput) => Promise<boolean>;
  uploadLogo: (file: File, slot?: 'header_before_scroll' | 'header_after_scroll' | 'footer' | 'general') => Promise<string | null>;
  uploadLogoBase64: (base64: string, filename?: string, slot?: 'header_before_scroll' | 'header_after_scroll' | 'footer' | 'general') => Promise<string | null>;
  resetSettings: () => Promise<boolean>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PortalSettings>(DEFAULT_PORTAL_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch settings on mount
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
      }
    } catch (err: any) {
      console.warn('Could not load settings from backend, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Update Settings
  const updateSettings = async (input: UpdateSettingsInput): Promise<boolean> => {
    try {
      setIsSaving(true);
      setError(null);
      setSaveSuccess(false);

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update settings');
      }

      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error updating settings:', err);
      setError(err.message || 'Error saving settings');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Upload Logo from File
  const uploadLogo = async (
    file: File,
    slot: 'header_before_scroll' | 'header_after_scroll' | 'footer' | 'general' = 'general'
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const logoUrl = await uploadLogoBase64(base64, file.name, slot);
        resolve(logoUrl);
      };
      reader.onerror = () => {
        setError('Failed to read selected image file');
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload Logo Base64
  const uploadLogoBase64 = async (
    base64: string,
    filename = 'logo.png',
    slot: 'header_before_scroll' | 'header_after_scroll' | 'footer' | 'general' = 'general'
  ): Promise<string | null> => {
    try {
      setIsSaving(true);
      setError(null);
      setSaveSuccess(false);

      const res = await fetch('/api/settings/logo-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          filename,
          slot,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload logo');
      }

      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        return json.logoUrl || json.data.logoUrl;
      }
      return null;
    } catch (err: any) {
      console.error('Error uploading logo:', err);
      setError(err.message || 'Error uploading logo');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Reset Settings
  const resetSettings = async (): Promise<boolean> => {
    try {
      setIsSaving(true);
      setError(null);
      setSaveSuccess(false);

      const res = await fetch('/api/settings/reset', {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to reset settings');

      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Error resetting settings:', err);
      setError(err.message || 'Error resetting settings');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        isSaving,
        error,
        saveSuccess,
        updateSettings,
        uploadLogo,
        uploadLogoBase64,
        resetSettings,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
