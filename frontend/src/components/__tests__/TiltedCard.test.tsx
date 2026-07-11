import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TiltedCard from '../TiltedCard';

describe('TiltedCard', () => {
  it('renders image with correct src and alt text', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
      />
    );

    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('applies lazy loading by default', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
      />
    );

    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('applies eager loading when specified', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        loading="eager"
      />
    );

    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('applies high fetch priority when specified', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        fetchpriority="high"
      />
    );

    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('displays caption when showTooltip is true', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        captionText="Test Caption"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        showTooltip={true}
      />
    );

    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  it('does not display caption when showTooltip is false', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        captionText="Test Caption"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        showTooltip={false}
      />
    );

    expect(screen.queryByText('Test Caption')).not.toBeInTheDocument();
  });

  it('displays mobile warning when showMobileWarning is true', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        showMobileWarning={true}
      />
    );

    expect(screen.getByText(/not optimized for mobile/i)).toBeInTheDocument();
  });

  it('does not display mobile warning when showMobileWarning is false', () => {
    render(
      <TiltedCard
        imageSrc="/test-image.jpg"
        altText="Test Image"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        showMobileWarning={false}
      />
    );

    expect(screen.queryByText(/not optimized for mobile/i)).not.toBeInTheDocument();
  });
});
