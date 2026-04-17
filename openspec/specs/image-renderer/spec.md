## ADDED Requirements

### Requirement: Pixel-perfect PNG export
The system SHALL provide a mechanism to export the generated carousel slides as high-resolution .png images (1080x1350px).

#### Scenario: Downloading slide deck
- **WHEN** user clicks "Download PNGs"
- **THEN** the system renders each slide using Satori and provides a zipped archive of 4 images.

### Requirement: Consistent visual styling
The exported PNG images MUST match the visual preview shown in the dashboard.

#### Scenario: Preview vs Export parity
- **WHEN** a custom font or background color is applied in the preview
- **THEN** it is preserved accurately in the generated PNG export.
