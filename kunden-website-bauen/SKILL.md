---
name: "kunden-website-bauen"
description: "Moderne, branchenpassende Kunden-Webseiten für Benchmark Media bauen (Stil wie Prüfstelle Ostbevern/Brönnecke) und als Vorschau auf Netlify bereitstellen."
---

# Kunden-Webseite bauen (Benchmark Media)

Ziel: Für einen lokalen Kunden (Handwerk, Kanzlei, Prüfstelle, Praxis, Dienstleister …) eine One-Page-Webseite bauen, die **zeitgemäß-modern, seriös und conversion-stark** ist – nicht „jung-hip“. Zielgruppe der Kunden ist oft Ü45/Ü50. Referenz-Projekte: Prüfstelle Ostbevern (HU/TÜV-Partner) und Steuerkanzlei Brönnecke.

## 1. Recherche zuerst
- Bestehende Kundenseite komplett lesen (Startseite, Leistungen, Über uns, Kontakt, Impressum, Datenschutz). Wenn direkter Abruf blockiert ist: web-fetch-Agent nutzen.
- Erfassen: Firmenname, Inhaber, Adresse, Telefon, E-Mail, Öffnungszeiten, Leistungen (Wortlaut), Partner/Mitgliedschaften (z. B. TÜV NORD, Kammer), Buchungs-/Terminlinks, Google-Maps-Link, Bild-URLs mit Alt-Text, USt-ID.
- Bilder des Kunden werden wiederverwendet (absolute URLs der Kundendomain, mit `onerror`-Fallback auf einen farbigen Platzhalter).
- **Nichts erfinden:** keine Preise, Bewertungen, Kundenzahlen, Jahreszahlen, Parkplätze o. Ä., die nicht belegt sind. Fehlende Infos im Abschlusstext als offene Punkte nennen.
- Markennamen nur so verwenden, wie es der Kunde darf (z. B. „Offizielle TÜV NORD Station“, sonst neutral „HU“).

## 2. Designsystem (verbindlich)
- **Farben:** Weiß + minimal getöntes Weiß (`#F6F9FD`-Richtung, kein Grau), **eine** Branchen-Hauptfarbe sparsam, dazu eine sehr dunkle Variante derselben Farbe für dunkle Flächen (Navy-Prinzip), helle Tönung der Hauptfarbe für Flächen. Grün nur für „bestanden/geöffnet“.
  - Beispiele: Prüfstelle/Kfz → klassisches Prüf-Blau `#0B4F9C` + Navy `#0A2647`; Steuer/Recht → Dunkelblau/Navy; Gesundheit → ruhiges Petrol/Teal; Handwerk/Bau → Anthrazit + warmes Orange als Akzent; Garten/Landwirtschaft → Waldgrün; Gastro → warmes Bordeaux.
- **Typografie:** Überschriften Serif (`Source Serif 4`, 500, kursiver Akzent in der Hauptfarbe), Fließtext `Inter` 18 px, Zeilenhöhe 1,65. Große, gut lesbare Größen.
- **Formen:** Radius 10–22 px, feine Linien `#DCE5F0`-Richtung, weiche Schatten, Eyebrow-Labels (Versalien, Linie davor).
- **Animation dezent:** Reveal beim Scrollen, Ken-Burns im Hero, leichte Parallaxe im Bildband, pulsierender „Jetzt geöffnet“-Punkt. `prefers-reduced-motion` respektieren.

## 3. Seitenaufbau (Bausteine, modular erweiterbar)
Jeder Baustein ist eine eigene `<section>` mit eigenem CSS-Block, damit Abschnitte ergänzt, getauscht oder entfernt werden können.
1. Topbar (dunkel): Vertrauens-Claim + Öffnungstage + Telefon.
2. Sticky Header: Logo (SVG-Monogramm/Marke), Navigation, Haupt-CTA-Button.
3. Hero: Eyebrow, Serif-H1 mit kursivem Akzent, Unterzeile, 2 CTAs (Hauptaktion + Telefon), 3 Vertrauens-Häkchen; rechts großes Kundenfoto mit Karte „Auf einen Blick“ (Live-Status geöffnet/geschlossen, Adresse, Telefon, heutige Zeiten) und ggf. wechselnder Erfolgs-Meldung. Wellen-Übergang nach unten.
4. Fakten-Band (dunkel, 4 Spalten): z. B. Offiziell / Persönlich / Erreichbar / Nah.
5. Leistungen als Raster-Karten mit Icons und Nummern; letzte Karte = farbige CTA „Ihr Anliegen ist nicht dabei?“.
6. Bildband in voller Breite mit Kundenfoto, Farbverlauf, Zitat + CTA.
7. **Branchen-Interaktion** (ein sinnvolles Werkzeug pro Branche), z. B. HU-Fälligkeits-Check mit Plakette, Fristen-Rechner, Kosten-/Bedarfs-Check.
8. **Animierte Einzugsgebiets-Karte:** stilisierte SVG-Karte (echte Koordinaten der Umgebungsorte), Bahnen von den Orten zum Kunden, Punkte fahren hin, bei Ankunft Puls + Meldung (branchenpassend, z. B. „HU bestanden“, „Erklärung abgegeben“). Kennzeichnen als „Symbolische Darstellung“. Startet nur im sichtbaren Bereich.
9. Über uns: Porträt mit rotierendem Siegel, Text (Kundenwortlaut nutzen), Werte-Liste.
10. Ablauf in 3 Schritten.
11. FAQ (details/summary) – Inhalte zusätzlich als FAQPage-Schema.
12. Kontakt (dunkel): große Telefonnummer, E-Mail, CTAs, Anschrift + Route, Öffnungszeiten-Tabelle mit „heute“.
13. Footer mit Impressum/Datenschutz (auf bestehende Kundenseiten verlinken, bis eigene vorhanden sind).
14. WhatsApp: schwebender Button (Desktop) + feste Leiste unten auf dem Handy (Anrufen / WhatsApp / Hauptaktion). WhatsApp-Link mit vorausgefülltem Text; Nummer beim Kunden verifizieren lassen.

## 4. SEO & Technik
- Title, Meta-Description, Canonical, Open Graph, Geo-Meta, saubere H1/H2-Struktur, sprechende Alt-Texte.
- JSON-LD: passender LocalBusiness-Typ (z. B. AutoRepair, AccountingService, Dentist) mit Adresse, Geo, Öffnungszeiten, areaServed, Leistungen, ReserveAction für Buchungslinks; plus FAQPage.
- Eine einzige `index.html`, CSS/JS inline, nur Google Fonts extern. Mobil ab 360 px ohne horizontales Scrollen; Live-Öffnungsstatus in Europe/Berlin berechnen.
- Vor Auslieferung mit Playwright Desktop (1440) und Mobil (390) rendern, Screenshots prüfen, JS-Fehler = 0.

## 5. Vorschau online stellen
- Ordnerstruktur `kunden-vorschau/`: `index.html` (Übersicht „Website-Vorschauen“ mit Karte je Kunde), `robots.txt` (Disallow: /), je Kunde Unterordner `<kunden-slug>/index.html`.
- In der Vorschau-Kopie `<meta name="robots" content="noindex,nofollow">` setzen (die Produktivversion bleibt `index,follow`).
- Neuen Kunden als Unterordner ergänzen **und** einen Eintrag auf der Übersichtsseite hinzufügen; bestehende Kunden nicht entfernen.
- Deploy auf die bestehende Netlify-Seite **benchmark-vorschau** über den Netlify-Connector (falls nicht vorhanden: anlegen). Wenn der Connector im Chat fehlt: ZIP des Ordners `kunden-vorschau` ausliefern (Upload über app.netlify.com/drop).
- Dem Nutzer am Ende den direkten Link zur Kundenseite schicken.

## 6. Abschluss-Nachricht
Kurz auf Deutsch: was gebaut wurde (Stichpunkte je Abschnitt), Link bzw. Datei, offene Punkte zum Abklären mit dem Kunden (WhatsApp-Nummer, fehlende Fotos, Preise, Texte).