# EquiSolve – Kurz‑Spezifikation (Markdown)

Eine iPad‑optimierte Web‑App, die Schüler:innen beim **schrittweisen Lösen von Gleichungen und Termumformungen** unterstützt. Ziel ist ein **klarer Lernablauf**, einfache **Touch‑Eingabe** und **automatische Prüfung** jedes Schritts.

---

## 1) Ziel & Nutzen
- **Für wen?** Klassen 7–12 (Sek I/II), Algebra‑Schwerpunkt.
- **Was bringt’s?**
  - Saubere **Schritt‑für‑Schritt‑Übung** mit sofortigem Feedback.
  - **Fehlerfreundlich**: typische Stolpersteine werden erkannt und erklärt.
  - **Schnelle Eingabe** dank Bildschirmtastatur für Brüche, Wurzeln, Exponenten.
  - **Zufallsaufgaben** in wählbaren Schwierigkeitsstufen.

---

## 2) MVP‑Umfang (erste nutzbare Version)
- Gleichungen mit **einer Variablen** (lineare Fälle + einfache Brüche/Klammern).
- Erlaubte Schritte: `+a`, `−a`, `·a`, `:a (a≠0)`; Klammern auflösen, Zusammenfassen.
- **Zufallsgenerator**: Easy/Medium.
- **Prüfung**: Ist der eingegebene Term/die Gleichung **äquivalent** zum erwarteten?
- **PWA**: offline nutzbar, installierbar auf dem iPad.

---

## 3) Geplanter Arbeitsablauf (User‑Flow)
1. **Aufgabe starten** (Zufallsaufgabe je nach Schwierigkeit).
2. **Schritt wählen**: „Äquivalenzumformung ja/nein“. Wenn ja, z. B. `+3` eintragen.
3. App **wendet den Schritt auf beide Seiten** an, zeigt **neue Zeile**.
4. SuS **geben beide Seiten** (links/rechts) ein → App **prüft Äquivalenz**.
5. **Feedback**: korrekt, Hinweis oder Fehlererklärung. **Undo/Redo** möglich.
6. Ziel erreicht? → **Zusammenfassung** und nächste Aufgabe.

---

## 4) Module (übersichtlich erklärt)

### 4.1 Eingabe & Bildschirmtastatur
- Touch‑optimierte **Mathe‑Tastatur** (Bruch, Wurzel, Exponenten, Klammern).
- Cursor‑Tasten, Vorzeichen in Klammern (z. B. `×(−2)`, `:(−3)`).
- Optional: Apple Pencil (später) für Handschrift zu Formel.

### 4.2 Aufgaben‑Generator
- Erzeugt klare, lösbare Gleichungen/Termaufgaben per Zufall.
- **Profile**: Easy (ohne verschachtelte Brüche), Medium (mit Klammern/Brüchen).
- Stellt sicher: **keine Division durch 0**, eindeutige Lösung.

### 4.3 Transformations‑Engine
- Setzt die **erlaubten Regeln** didaktisch korrekt um (beide Seiten!).
- Verhindert **ungültige Schritte** (z. B. :0) und führt **Nebenbedingungen** (z. B. `a≠0`).
- **Protokoll** aller Schritte mit Begründung, **Undo/Redo**.

### 4.4 Äquivalenz‑Checker
- Prüft, ob zwei Terme/Gleichungsseiten **mathematisch übereinstimmen**.
- Kombiniert **algebraische Normalformen** und **numerische Tests** (Zufallswerte im gültigen Bereich) – robust gegen anders aussehende, aber gleiche Formen.

### 4.5 Lernmodus & Verlauf
- Sitzungen mit **Schrittverlauf**, Zeit, Hinweisen.
- **Export**: PDF/CSV der Lösungsschritte (für Mappen/Abgabe).

### 4.6 Settings
- Schwierigkeit, erlaubte Operationen, Variablen, Zahlenbereiche.
- Feedback‑Stil: streng vs. lernfreundlich.

### 4.7 Persistenz & PWA
- Lokale Speicherung (Einstellungen, Verlauf) **offline‑fähig**.
- Installierbar auf iPad‑Homescreen.

### 4.8 (Optional) Lehrer‑Ansicht
- Überblick über bearbeitete Aufgaben, wiederkehrende Fehlermuster.
- **Nur lokal** oder später DSGVO‑konform mit Schulkonten.

---

## 5) Geplante Nutzung externer Bausteine („Quellen“)

> Ziel: **Zeit sparen**, **Qualität** sichern, **Wartbarkeit** erhöhen.

- **MathLive** (Eingabe + virtuelle Mathe‑Tastatur)
  - **Wofür?** Komfortable Touch‑Eingabe (Bruch, Wurzel, Exponent) und direktes Rendern.
  - **Warum?** iPad‑freundlich, stabil, gut dokumentiert.
  - **Wie?** Eingabefeld in React‑Komponente; liefert LaTeX/AST weiter an den Math‑Core.

- **Compute Engine** (symbolischer Kern, gut mit MathLive kombinierbar)
  - **Wofür?** Algebraische **Vereinfachung/Normalformen**, LaTeX↔AST, Regeln.
  - **Warum?** Spart Eigenbau‑Parser und komplizierte Algebra‑Routinen.
  - **Wie?** Term aus Eingabe → AST → `simplify/expand/factor` → Vergleich/Äquivalenz.

- **math.js** (numerische Basis)
  - **Wofür?** **Numerische Tests** zur Äquivalenz (Zufallswerte), Brüche/BigNumber.
  - **Warum?** Robustheit, einfache API.
  - **Wie?** Mehrfachauswertung mit zufälligen, gültigen Werten; Toleranzen beachten.

- **(Referenz)** mathsteps (Schritt‑Regeln)
  - **Wofür?** Ideen/Regeln für **didaktische Einzelschritte**.
  - **Warum?** Schneller Start fürs Regel‑Design (wir passen an/übersetzen).
  - **Wie?** Als Inspirationsquelle; eigene Engine bleibt führend.

- **PWA & Storage**
  - **Vite + VitePWA/Workbox**: Offline‑Cache, Installierbarkeit.
  - **IndexedDB (z. B. über Dexie)**: lokale Verläufe/Settings.

- **UI‑Rahmen**
  - **React + TypeScript** (Haupt‑Frontend), optional **Zustand/Redux** für State.
  - **UI‑Kit** (z. B. shadcn/ui) für konsistente Buttons/Dialogs.

> **Hinweis:** Wir starten klein (MathLive + Compute Engine + math.js). KaTeX/MathJax sind nicht zwingend nötig, da MathLive gut rendert.

---

## 6) Daten (einfaches Bild)
- **Term/Gleichung**: wird als **AST** verarbeitet (statt reiner Zeichenkette).
- **Nebenbedingungen**: z. B. `Nenner ≠ 0`, `Ausdruck ≥ 0` bei Wurzeln.
- **Verlauf**: Liste aus Schritten (vorher/nachher, Regel, Zeit, Feedback).

---

## 7) Didaktik & Feedback
- **Transparenz**: App zeigt, *warum* ein Schritt erlaubt/nicht erlaubt ist.
- **Produktivität**: Kennzeichnung von Schritten, die dem Ziel näher kommen (z. B. Brüche entfernen, Leitkoeffizient → 1).
- **Fehlerhinweise**: typische Missverständnisse (Vorzeichen, Klammern, Division durch 0).

---

## 8) Datenschutz
- Standardmäßig **ohne Registrierung**; alles **lokal** auf dem Gerät.
- Später optional: **Cloud‑Sync** mit Schulkonto (DSGVO‑konform, Opt‑in, Löschfunktion).

---

## 9) Roadmap (kurz)
1. **MVP**: Eingabe (MathLive), Generator (Easy/Medium), Transformations‑Basis, Äquivalenz‑Check, PWA‑Shell.
2. **v1.0**: Ungleichungen/Beträge (optional), erweiterte Potenzen/Wurzeln, Export/Analytics.
3. **v2.0**: Handschrift, Klassenverwaltung, komplexere Mathematik.

---

## 10) Akzeptanzkriterien (MVP)
- Eine Medium‑Aufgabe mit Brüchen lässt sich **vollständig korrekt** lösen.
- **Jeder korrekte Schritt** wird erkannt; unzulässige Schritte werden verhindert.
- **Nebenbedingungen** (z. B. `a≠0`) werden automatisch geführt.
- Tastatur ermöglicht schnelle Eingaben wie `×(−2)` und `:(−3)` sowie Brüche/Wurzeln.

---

## 11) Glossar
- **MVP**: Kleinste Version, die schon sinnvoll nutzbar ist.
- **Äquivalenzumformung**: Umformung, die den Wahrheitsgehalt einer Gleichung erhält (beide Seiten!).
- **AST**: Baumdarstellung eines Terms zur sicheren Verarbeitung.

