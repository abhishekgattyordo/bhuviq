import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { SettingsProvider } from './context/SettingsContext';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { BananaPowderPage } from './pages/BananaPowderPage';
import { ScienceQualityPage } from './pages/ScienceQualityPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PartnerWithUsPage } from './pages/PartnerWithUsPage';
import { AdminEnquiriesPage } from './pages/AdminEnquiriesPage';
import { SettingsPage } from './pages/SettingsPage';
import { TerraVancePage } from './pages/TerraVancePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const { currentPath } = useRouter();

  // Normalize path
  const path = currentPath.split('#')[0].split('?')[0];

  if (path === '' || path === '/') {
    return <HomePage />;
  }
  if (path === '/about') {
    return <AboutPage />;
  }
  if (path === '/ingredients') {
    return <IngredientsPage />;
  }
  if (path === '/ingredients/banana-powder') {
    return <BananaPowderPage />;
  }
  if (path === '/science-quality') {
    return <ScienceQualityPage />;
  }
  if (path === '/applications') {
    return <ApplicationsPage />;
  }
  if (path === '/sustainability') {
    return <SustainabilityPage />;
  }
  if (path === '/manufacturing') {
    return <ManufacturingPage />;
  }
  if (path === '/insights') {
    return <InsightsPage />;
  }
  if (path.startsWith('/insights/')) {
    const slug = path.replace('/insights/', '');
    return <InsightDetailPage slug={slug} />;
  }
  if (path === '/contact') {
    return <ContactPage />;
  }
  if (path === '/partner-with-us') {
    return <PartnerWithUsPage />;
  }
  if (path === '/admin' || path === '/admin/enquiries') {
    return <AdminEnquiriesPage />;
  }
  if (path === '/settings' || path === '/admin/settings') {
    return <SettingsPage />;
  }
  if (path === '/terravance' || path === '/terra-vance') {
    return <TerraVancePage />;
  }
  if (path === '/privacy-policy' || path === '/privacy') {
    return <PrivacyPolicyPage />;
  }
  if (path === '/terms-and-conditions' || path === '/terms') {
    return <TermsConditionsPage />;
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <SettingsProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </SettingsProvider>
  );
}
