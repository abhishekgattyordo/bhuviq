import fs from 'fs';
import path from 'path';
import { DEFAULT_PORTAL_SETTINGS, PortalSettings, UpdateSettingsInput } from '../types/settings';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure required directories exist
function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// In-memory cache
let cachedSettings: PortalSettings | null = null;

export async function getSettings(): Promise<PortalSettings> {
  if (cachedSettings) {
    return cachedSettings;
  }

  ensureDirs();

  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      cachedSettings = {
        ...DEFAULT_PORTAL_SETTINGS,
        ...parsed,
      };
      return cachedSettings as PortalSettings;
    }
  } catch (error) {
    console.error('Error reading settings file, using defaults:', error);
  }

  // If file doesn't exist, write defaults
  cachedSettings = { ...DEFAULT_PORTAL_SETTINGS };
  saveSettingsToFile(cachedSettings);
  return cachedSettings;
}

function saveSettingsToFile(settings: PortalSettings) {
  ensureDirs();
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving settings to file:', error);
  }
}

export async function updateSettings(input: UpdateSettingsInput): Promise<PortalSettings> {
  const current = await getSettings();

  const updated: PortalSettings = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  cachedSettings = updated;
  saveSettingsToFile(updated);
  return updated;
}

export type LogoSlot = 'header_before_scroll' | 'header_after_scroll' | 'footer' | 'general';

export async function saveUploadedLogo(
  imageBase64: string,
  originalFilename = 'logo.png',
  slot: LogoSlot = 'general'
): Promise<{ logoUrl: string; settings: PortalSettings }> {
  ensureDirs();

  // Parse mime type and raw base64 data
  let fileBuffer: Buffer;
  let extension = 'png';

  const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    const mimeType = matches[1];
    if (mimeType.includes('svg')) extension = 'svg';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
    else if (mimeType.includes('webp')) extension = 'webp';
    else if (mimeType.includes('png')) extension = 'png';
    fileBuffer = Buffer.from(matches[2], 'base64');
  } else {
    // If raw base64 without prefix
    const extMatch = path.extname(originalFilename).replace('.', '');
    if (extMatch) extension = extMatch;
    fileBuffer = Buffer.from(imageBase64, 'base64');
  }

  const prefix = slot.replace(/_/g, '-');
  const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
  const filePath = path.join(UPLOADS_DIR, filename);

  fs.writeFileSync(filePath, fileBuffer);

  const logoUrl = `/uploads/${filename}`;

  // Update specific slot in settings
  const partialUpdate: UpdateSettingsInput = {
    logoType: 'image_and_text',
  };

  if (slot === 'header_before_scroll') {
    partialUpdate.headerBeforeScrollLogoUrl = logoUrl;
  } else if (slot === 'header_after_scroll') {
    partialUpdate.headerAfterScrollLogoUrl = logoUrl;
    partialUpdate.logoUrl = logoUrl; // also keep primary in sync
  } else if (slot === 'footer') {
    partialUpdate.footerLogoUrl = logoUrl;
  } else {
    partialUpdate.logoUrl = logoUrl;
  }

  const updatedSettings = await updateSettings(partialUpdate);

  return {
    logoUrl,
    settings: updatedSettings,
  };
}

export async function resetSettings(): Promise<PortalSettings> {
  const reset: PortalSettings = {
    ...DEFAULT_PORTAL_SETTINGS,
    updatedAt: new Date().toISOString(),
  };

  cachedSettings = reset;
  saveSettingsToFile(reset);
  return reset;
}
