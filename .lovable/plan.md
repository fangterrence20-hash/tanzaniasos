# Complete English and Swahili Localization

## Goal
Make the entire Tanzania SOS interface switch cleanly between English and Swahili, including every Karibu label, action, message, form, map state, and accessibility description.

## What will change
- Expand the shared translation dictionary to cover all remaining interface text across Home, Dispatch, First Aid, Profile, Karibu, maps, startup, empty states, errors, confirmations, and accessibility labels.
- Replace fixed English, fixed Swahili, and combined “Swahili / English” interface labels with the selected language only.
- Keep proper names, emergency numbers, entered profile data, and location names unchanged.
- Localize dynamic text such as relative report times, verification counts, GPS states, active-report counts, payment feedback, and report-form validation.
- Make Karibu sample report descriptions available in both languages while preserving submitted user text as entered.
- Update the document language when the user switches languages and keep the saved language preference.

## Karibu
- Translate its title, map legend, filters, GPS notice, report cards, buttons, empty state, photo controls, dialog fields, confirmation messages, and map accessibility text.
- Generate WhatsApp hazard messages in the currently selected language.
- Remove forced bilingual subtitles so switching to English produces a fully English screen and switching to Swahili produces a fully Swahili screen.

## Verification
- Check all source screens for remaining single-language interface strings.
- Verify both languages on desktop and mobile, including Karibu reporting, verification, map states, and the saved language after refresh.
- Confirm the app builds without errors and no hydration warning remains.
