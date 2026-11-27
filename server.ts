import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { createEnquirySchema, updateEnquiryStatusSchema } from './src/lib/validations/enquiry';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from './src/server/enquiryService';
import {
  getSettings,
  updateSettings,
  saveUploadedLogo,
  resetSettings,
} from './src/server/settingsService';

const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with 15mb limit for logo base64 uploads
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Serve static uploads
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'BhuviQ Nyra International API' });
  });

  // ==========================================
  // ENQUIRIES REST API
  // ==========================================

  // 1. POST /api/enquiries - Create Enquiry with Zod Validation
  app.post('/api/enquiries', async (req: Request, res: Response) => {
    try {
      const validationResult = createEnquirySchema.safeParse(req.body);

      if (!validationResult.success) {
        const issues = (validationResult.error as any).issues || (validationResult.error as any).errors || [];
        const firstError = issues[0];
        return res.status(400).json({
          success: false,
          message: firstError ? (firstError.message || 'Invalid input') : 'Invalid request data',
        });
      }

      await createEnquiry(validationResult.data);

      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully',
      });
    } catch (error) {
      console.error('Error creating enquiry:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while processing enquiry',
      });
    }
  });

  // 2. GET /api/enquiries - Get All Enquiries
  app.get('/api/enquiries', async (_req: Request, res: Response) => {
    try {
      const enquiries = await getAllEnquiries();
      return res.status(200).json({
        success: true,
        data: enquiries,
      });
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while fetching enquiries',
      });
    }
  });

  // 3. GET /api/enquiries/:id - Get Single Enquiry
  app.get('/api/enquiries/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const enquiry = await getEnquiryById(id);

      if (!enquiry) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: enquiry,
      });
    } catch (error) {
      console.error('Error fetching single enquiry:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  });

  // 4. PATCH /api/enquiries/:id - Update Enquiry Status
  app.patch('/api/enquiries/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const validationResult = updateEnquiryStatusSchema.safeParse(req.body);

      if (!validationResult.success) {
        const issues = (validationResult.error as any).issues || (validationResult.error as any).errors || [];
        const firstError = issues[0];
        return res.status(400).json({
          success: false,
          message: firstError ? (firstError.message || 'Invalid status') : 'Invalid status value',
        });
      }

      const updated = await updateEnquiryStatus(id, validationResult.data.status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry updated successfully',
      });
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while updating enquiry',
      });
    }
  });

  // 5. DELETE /api/enquiries/:id - Delete Enquiry
  app.delete('/api/enquiries/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await deleteEnquiry(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while deleting enquiry',
      });
    }
  });

  // ==========================================
  // PORTAL SETTINGS & BRAND LOGO API
  // ==========================================

  // 1. GET /api/settings - Get Current Branding & Logo Settings
  app.get('/api/settings', async (_req: Request, res: Response) => {
    try {
      const settings = await getSettings();
      return res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      console.error('Error fetching portal settings:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve portal settings',
      });
    }
  });

  // 2. PUT /api/settings - Update Branding & Logo Settings
  app.put('/api/settings', async (req: Request, res: Response) => {
    try {
      const updated = await updateSettings(req.body);
      return res.status(200).json({
        success: true,
        data: updated,
        message: 'Settings updated successfully',
      });
    } catch (error) {
      console.error('Error updating portal settings:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update portal settings',
      });
    }
  });

  // 3. POST /api/settings/logo-upload - Upload and Store Logo Image
  app.post('/api/settings/logo-upload', async (req: Request, res: Response) => {
    try {
      const { imageBase64, filename, slot } = req.body;

      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'imageBase64 string is required',
        });
      }

      const result = await saveUploadedLogo(
        imageBase64,
        filename || 'logo.png',
        slot || 'general'
      );

      return res.status(200).json({
        success: true,
        logoUrl: result.logoUrl,
        data: result.settings,
        message: 'Logo uploaded and saved to backend successfully',
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to process and store logo image',
      });
    }
  });

  // 4. POST /api/settings/reset - Reset Settings to Default Brand Defaults
  app.post('/api/settings/reset', async (_req: Request, res: Response) => {
    try {
      const reset = await resetSettings();
      return res.status(200).json({
        success: true,
        data: reset,
        message: 'Settings reset to defaults',
      });
    } catch (error) {
      console.error('Error resetting settings:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to reset settings',
      });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE / STATIC ASSETS
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BhuviQ Nyra server running at http://localhost:${PORT}`);
  });
}

startServer();
