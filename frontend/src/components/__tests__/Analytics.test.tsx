import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import Analytics, { trackEvent, trackPageView } from '../Analytics';

describe('Analytics', () => {
  beforeEach(() => {
    // Reset environment before each test
    vi.stubEnv('MODE', 'test');
    // Clear any existing dataLayer
    delete (window as any).dataLayer;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not load analytics in development mode', () => {
    vi.stubEnv('MODE', 'development');
    render(<Analytics measurementId="G-TEST123" />);
    
    expect(document.querySelector('script[src*="googletagmanager"]')).not.toBeInTheDocument();
  });

  it('does not load analytics when measurement ID is not provided', () => {
    vi.stubEnv('MODE', 'production');
    render(<Analytics />);
    
    expect(document.querySelector('script[src*="googletagmanager"]')).not.toBeInTheDocument();
  });

  it('loads analytics in production mode with measurement ID', () => {
    vi.stubEnv('MODE', 'production');
    render(<Analytics measurementId="G-TEST123" />);
    
    const script = document.querySelector('script[src*="googletagmanager"]');
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST123');
  });

  it('initializes dataLayer when analytics loads', () => {
    vi.stubEnv('MODE', 'production');
    render(<Analytics measurementId="G-TEST123" />);
    
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });
});

describe('trackEvent', () => {
  beforeEach(() => {
    vi.stubEnv('MODE', 'test');
    delete (window as any).dataLayer;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not track events in development mode', () => {
    window.dataLayer = [];
    
    trackEvent('test_event', { test: 'data' });
    
    expect(window.dataLayer).toHaveLength(0);
  });

  it('tracks events in production mode', () => {
    vi.stubEnv('MODE', 'production');
    window.dataLayer = [];
    
    trackEvent('test_event', { test: 'data' });
    
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'test_event',
      test: 'data'
    });
  });
});

describe('trackPageView', () => {
  beforeEach(() => {
    vi.stubEnv('MODE', 'test');
    delete (window as any).dataLayer;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not track page views in development mode', () => {
    window.dataLayer = [];
    
    trackPageView('/test-path');
    
    expect(window.dataLayer).toHaveLength(0);
  });

  it('tracks page views in production mode', () => {
    vi.stubEnv('MODE', 'production');
    window.dataLayer = [];
    
    trackPageView('/test-path');
    
    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toEqual({
      event: 'page_view',
      page_path: '/test-path'
    });
  });
});
