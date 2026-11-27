/**
 * Utility to convert opaque logo images into transparent PNGs
 * with smart corner-color detection, anti-aliased edge feathering,
 * and optional bounding-box whitespace trimming.
 */

export interface TransparencyOptions {
  tolerance?: number; // 0 to 100 (default 28)
  feather?: number; // 0 to 30 (default 12)
  targetColor?: { r: number; g: number; b: number } | null; // null = auto detect from corner pixels
  mode?: 'auto' | 'white' | 'black' | 'custom';
  trimWhitespace?: boolean; // crop transparent padding around logo
}

export interface TransparencyResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  detectedBackground: { r: number; g: number; b: number; hex: string };
}

/**
 * Loads an image from a File, Blob, base64 or URL string into an HTMLImageElement
 */
export function loadImage(source: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error('Failed to load image for processing: ' + err));

    if (typeof source === 'string') {
      img.src = source;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(source);
    }
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Automatically sample corner pixels to identify the predominant background color
 */
function detectCornerBackground(
  data: Uint8ClampedArray,
  width: number,
  height: number
): { r: number; g: number; b: number; hex: string } {
  const corners = [
    0, // top-left
    (width - 1) * 4, // top-right
    (height - 1) * width * 4, // bottom-left
    ((height - 1) * width + (width - 1)) * 4, // bottom-right
    // Top center
    Math.floor(width / 2) * 4,
    // Bottom center
    ((height - 1) * width + Math.floor(width / 2)) * 4,
  ];

  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  let count = 0;

  for (const idx of corners) {
    if (idx < data.length - 3) {
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
      count++;
    }
  }

  const r = count > 0 ? Math.round(rSum / count) : 255;
  const g = count > 0 ? Math.round(gSum / count) : 255;
  const b = count > 0 ? Math.round(bSum / count) : 255;

  return { r, g, b, hex: rgbToHex(r, g, b) };
}

/**
 * Process image and return transparent PNG
 */
export async function convertToTransparentPng(
  source: File | Blob | string,
  options: TransparencyOptions = {}
): Promise<TransparencyResult> {
  const {
    tolerance = 28,
    feather = 12,
    mode = 'auto',
    trimWhitespace = true,
  } = options;

  const img = await loadImage(source);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Canvas 2D context is not supported');
  }

  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Determine target background color to remove
  let targetColor = options.targetColor;
  let detectedBg = { r: 255, g: 255, b: 255, hex: '#ffffff' };

  if (mode === 'white') {
    targetColor = { r: 255, g: 255, b: 255 };
    detectedBg = { r: 255, g: 255, b: 255, hex: '#ffffff' };
  } else if (mode === 'black') {
    targetColor = { r: 0, g: 0, b: 0 };
    detectedBg = { r: 0, g: 0, b: 0, hex: '#000000' };
  } else if (mode === 'custom' && targetColor) {
    detectedBg = { ...targetColor, hex: rgbToHex(targetColor.r, targetColor.g, targetColor.b) };
  } else {
    // Auto detect from corners
    detectedBg = detectCornerBackground(data, width, height);
    targetColor = { r: detectedBg.r, g: detectedBg.g, b: detectedBg.b };
  }

  const { r: tr, g: tg, b: tb } = targetColor;

  // Threshold scaled to max Euclidean distance (sqrt(255^2 * 3) ≈ 441.67)
  const maxDist = 441.67;
  const thresholdDist = (tolerance / 100) * maxDist;
  const featherDist = (feather / 100) * maxDist;

  // Track bounding box of non-transparent pixels for trimming
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    // Euclidean distance in RGB color space
    const dr = r - tr;
    const dg = g - tg;
    const db = b - tb;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    if (dist <= thresholdDist) {
      // Complete background removal
      data[i + 3] = 0;
    } else if (dist < thresholdDist + featherDist && featherDist > 0) {
      // Smooth anti-aliased edge transition
      const alphaFactor = (dist - thresholdDist) / featherDist;
      data[i + 3] = Math.round(a * alphaFactor);

      const px = (i / 4) % width;
      const py = Math.floor(i / 4 / width);
      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (py < minY) minY = py;
      if (py > maxY) maxY = py;
    } else {
      // Solid foreground pixel
      const px = (i / 4) % width;
      const py = Math.floor(i / 4 / width);
      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (py < minY) minY = py;
      if (py > maxY) maxY = py;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // If trimming whitespace and valid bounding box was found
  let finalCanvas = canvas;
  if (trimWhitespace && minX < maxX && minY < maxY) {
    const pad = 4; // slight padding in px
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(width - cropX, maxX - minX + pad * 2);
    const cropH = Math.min(height - cropY, maxY - minY + pad * 2);

    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = cropW;
    croppedCanvas.height = cropH;
    const croppedCtx = croppedCanvas.getContext('2d');
    if (croppedCtx) {
      croppedCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      finalCanvas = croppedCanvas;
    }
  }

  const dataUrl = finalCanvas.toDataURL('image/png');

  // Convert to Blob
  const blob = await new Promise<Blob>((resolve) => {
    finalCanvas.toBlob((b) => {
      resolve(b || new Blob());
    }, 'image/png');
  });

  return {
    dataUrl,
    blob,
    width: finalCanvas.width,
    height: finalCanvas.height,
    detectedBackground: detectedBg,
  };
}
