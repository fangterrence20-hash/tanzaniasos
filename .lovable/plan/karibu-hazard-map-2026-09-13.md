# Karibu Hazard Map

## Goal
Turn the existing Karibu screen into a mobile-first local hazard view, with Swahili as the primary language and concise English subtitles.

## What will be built
- A clear top header with “Karibu” and “Ripoti za Hatari Karibu / Nearby Hazard Reports.”
- A full-width interactive map showing the user’s GPS position and active hazard pins:
  - Red: accidents
  - Blue: flooding
  - Orange: security
- A prominent “Ripoti Dharura / Report Emergency” action that opens a simple report form for category, description, and optional photo.
- A recent-reports list ordered by live distance from the user, with category, landmark, relative Swahili timestamp, verification count, and distance.
- Large “Bado Ipo / Still There” and “Shiriki / Share” controls on every report.
- WhatsApp sharing with a preformatted bilingual hazard message and map location link.

## Interaction and states
- Hazard category filters update both pins and the report list.
- Selecting a map pin highlights its report; selecting a report focuses its map pin.
- Submitting a report adds it immediately to the active map and nearby list, including a local photo preview when provided.
- Verification counts update instantly and prevent repeated verification during the current session.
- GPS unavailable and empty-filter states remain clear and usable.

## Technical details
- Keep the existing app shell, dark emergency design tokens, navigation, and language toggle.
- Add a browser-only Leaflet hazard map loaded after hydration.
- Add typed, bundled Tanzania hazard sample data and distance sorting using the existing location helper.
- Keep this work frontend-only; reports and votes persist for the current browser session rather than being sent to the responder backend.
- Update route metadata with unique title, description, Open Graph, and Twitter tags.
- Verify the result at mobile and desktop sizes, including form, map/list selection, voting, sharing, and error-free rendering.
