import { useEffect } from 'react';

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

interface AnalyticsProps {
  measurementId?: string;
}

export default function Analytics({ measurementId }: AnalyticsProps) {
  useEffect(() => {
    // Only load analytics in production and if measurement ID is provided
    if (import.meta.env.MODE !== 'production' || !measurementId) {
      return;
    }

    // Load Google Analytics 4
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      // Cleanup scripts when component unmounts
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, [measurementId]);

  return null;
}

// Helper function to track events (can be used throughout the app)
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (import.meta.env.MODE === 'production' && typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
};

// Helper function to track page views
export const trackPageView = (path: string) => {
  if (import.meta.env.MODE === 'production' && typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path
    });
  }
};
