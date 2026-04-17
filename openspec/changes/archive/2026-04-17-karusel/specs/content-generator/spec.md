## ADDED Requirements

### Requirement: 4-Slide carousel structure
The system SHALL generate exactly 4 slides for every topic:
1. **Slide 1**: Hook/Title with brief intro.
2. **Slide 2**: Key Insight #1 (Summarized from search).
3. **Slide 3**: Key Insight #2 (Summarized from search).
4. **Slide 4**: Call to Action (CTA).

#### Scenario: Summarizing "Saham Indonesia"
- **WHEN** user inputs "berita tentang saham Indonesia"
- **THEN** high-level insights are distributed exactly across slides 2 and 3.

### Requirement: Next.js 15 Server-side synthesis
The generation logic MUST be executed within Next.js Server Actions or Route Handlers.

#### Scenario: Server-side generation
- **WHEN** the "Generate" button is clicked
- **THEN** a Server Action triggers the AI pipeline without exposing internal API keys to the client.
