## ADDED Requirements

### Requirement: Multi-article research grounding
The system SHALL use Google Search grounding to identify 3-5 relevant articles or news pieces for the user-provided topic.

#### Scenario: Researching specific news
- **WHEN** user inputs "berita tentang saham Indonesia"
- **THEN** the system fetches the latest news stories from search results before performing the summary.

### Requirement: Indonesian language support
The elaborator SHALL support and process inputs in Indonesian, ensuring generated summaries maintain correct grammatical structure and tone.

#### Scenario: Indonesian input topic
- **WHEN** the input is in Indonesian
- **THEN** the research and the final synthesized slide content are both in Indonesian.
