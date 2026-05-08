# Carousel Theme Template System Spec

## Overview
This feature introduces a comprehensive theme system for Karusel AI, allowing users to choose from 25 distinct visual styles for their generated carousels. The system includes a live preview mechanism and ensures that the exported PNGs maintain the selected theme's aesthetics.

## Requirements

### 1. Theme Collection
The following 25 themes must be implemented:
- **Neobrutalist**: Raw, bold, confrontational with structured impact.
- **Swiss/International**: Grid-based, systematic, ultra-clean typography.
- **Editorial**: Magazine-inspired, sophisticated typography, article-focused.
- **Glassmorphism**: Translucent layers, blurred backgrounds, depth.
- **Retro-futuristic**: 80s vision of the future, refined nostalgia.
- **Bauhaus**: Geometric simplicity, primary shapes, form follows function.
- **Art Deco**: Elegant patterns, luxury, vintage sophistication.
- **Minimal**: Extreme reduction, maximum whitespace, essential only.
- **Flat**: No depth, solid colors, simple icons, clean.
- **Material**: Google-inspired, cards, subtle shadows, motion.
- **Neumorphic**: Soft shadows, extruded elements, tactile.
- **Monochromatic**: Single color variations, tonal depth.
- **Scandinavian**: Hygge, natural materials, warm minimalism.
- **Japandi**: Japanese-Scandinavian fusion, zen meets hygge.
- **Dark Mode First**: Designed for dark interfaces, high contrast elegance.
- **Modernist**: Clean lines, functional beauty, timeless.
- **Organic/Fluid**: Flowing shapes, natural curves, sophisticated blob forms.
- **Corporate Professional**: Trust-building, established, refined.
- **Tech Forward**: Innovative, clean, future-focused.
- **Luxury Minimal**: Premium restraint, high-end simplicity.
- **Neo-Geo**: Refined geometric patterns, mathematical beauty.
- **Kinetic**: Motion-driven, dynamic but controlled.
- **Gradient Modern**: Sophisticated color transitions, depth through gradients.
- **Typography First**: Type as the hero, letterforms as design.
- **Metropolitan**: Urban sophistication, cultural depth.

### 2. Live Preview
- Users can switch between themes and see the preview update instantly.
- The preview should use the actual generated content.
- Smooth transitions between themes (where possible).

### 3. Theme Configuration
Each theme should define:
- Background (colors, gradients, patterns)
- Typography styles (font family, size, weight, color)
- Accents (borders, decorative elements, shapes)
- Layout variations (spacing, alignment)

### 4. Export Integration
- The selected theme must be passed to the export API.
- `ImageResponse` (Satori) must correctly render the chosen theme.

## Technical Constraints
- **Satori Compatibility**: All theme styles must be compatible with Satori (subset of CSS).
- **Performance**: Theme switching must be performant on the client side.
- **Responsiveness**: The theme selector should be responsive.
