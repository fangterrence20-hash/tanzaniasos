# Tanzania SOS: First Response

Build a high-stakes, production-ready mobile app frontend for a Tanzanian Emergency & First Aid Response system called "Tanzania SOS". 

The user interface must be clean, high-contrast, accessible, and intuitive under high stress. Use dark charcoal background (#121212), bright emergency red (#E53935) for SOS actions, medical blue (#1976D2) for first aid, and green (#4CAF50) for mobile money elements. Include a global language toggle between English and Swahili (Kiswahili) at the top of the app.

Generate the following core views and workflows:

1. HOME SCREEN (Emergency Trigger):

   - Header with Language Switcher (EN/SW), offline indicator status, and profile avatar.

   - A prominent, large circular "HOLD 3 SECONDS FOR SOS" button in emergency red.

   - Quick category buttons below the SOS button: "Medical / Ambulance (115)", "Police (112/113)", "Fire (114)", "Road Accident / Towing".

   - A live location bar showing current GPS coordinates, city, and a what3words 3-word location identifier (e.g., ///filled.count.soap).

   - A "Silent Panic" button for discreet emergency alerts.

2. ACTIVE EMERGENCY DISPATCH VIEW:

   - Real-time map background showing user location and the nearest responding ambulance/unit approaching.

   - Status card: "Searching for nearest provider...", "Dispatched: E-Plus Ambulance (5 mins away)", or "Connecting to Police Operator".

   - Emergency contact quick-call/chat bar.

   - Integrated STK Push payment card: Option to pay/authorize dispatch via Vodacom M-Pesa, Airtel Money, or Tigo Pesa with pre-filled currency (TZS).

3. OFFLINE SWAHILI FIRST AID GUIDES:

   - A searchable library of step-by-step visual emergency guides optimized for low literacy:

     * CPR & Choking (Kurejesha Pumzi na Kukabiliana na Kukwama)

     * Severe Bleeding & Tourniquets (Kuzuia Kuvuja kwa Damu Nyingi)

     * Snake Bites (Kuumwa na Nyoka)

     * Road Accident Triage (Msaada wa Kwanza Ajali za Barabarani)

   - Step-by-step card design with clear vector illustration placeholders, simple bullet points, and an optional "Play Swahili Audio Guide" button.

4. USER & MEDICAL PROFILE (Settings):

   - Form inputs for Name, Blood Type, Allergies, Chronic Conditions, and ICE (In Case of Emergency) Contacts.

   - Toggle switch: "Auto-send SMS fallback when offline".

Ensure the layout is responsive, mobile-first, and styled using Tailwind CSS and modern UI components.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tanzaniasos.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f77ab92-9eff-41e3-bfae-71d00181fb73).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
