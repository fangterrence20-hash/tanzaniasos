# English and French across Tanzania SOS

## Goal
Make every app screen fully available in English and French, with English as the default and the existing language switcher changed to EN / FR.

## Changes
- Replace the current English/Swahili language model with English/French and migrate stored language preference handling safely.
- Translate all shared navigation, connection, emergency, dispatch, payment, profile, offline, GPS, and accessibility text.
- Translate every offline first-aid guide title, subtitle, and step into French while retaining English.
- Convert the Karibu hazard screen into a locale-aware English/French experience, including map labels, filters, report forms, timestamps, confirmation messages, sample reports, photo descriptions, and WhatsApp share text.
- Localize remaining hardcoded GPS/loading/error labels and voice input/output language selection.
- Update page titles and descriptions so they no longer describe the app as Swahili-first.

## Validation
- Check every content screen in both languages.
- Verify language switching persists after reload.
- Test mobile layout, guide search/audio controls, hazard actions, and ensure the app builds without errors.

## Technical details
- Keep one global locale state (`en` or `fr`) and use localized content objects for guide and hazard data.
- Treat any previously stored `sw` preference as English after this update.
- Use French browser speech locale (`fr-FR`) and English (`en-GB`) for voice features.
