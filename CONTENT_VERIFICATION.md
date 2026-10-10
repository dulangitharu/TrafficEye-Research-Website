# TrafficEye Research Portfolio (rebuilt) — content verification

Prepared: 10 October 2026. This file records where every piece of website content comes from, which evidence each figure belongs to, and what is still missing. `.vercelignore` keeps it off the Vercel deployment.

---

## 1. Academic sources used

| Source (as supplied) | Role on the website |
|---|---|
| Website guideline (`Website.pdf`, 16 slides) | Page structure (Home, Domain, Milestones, Documents, Presentations, About Us, Contact Us), milestone dropdown, 20 MB limit, HTML/CSS |
| `IT22294234_Proposal_Presentation_Report.pdf` (March 2026) | Background, literature review, references [1]–[20], original gap, original objectives, scope evolution, degree, supervisor titles |
| `R26-IT-056_IT22294234_PP1my.pptx` (Progress Presentation 1) | Earlier development, panel feedback, traffic-level thresholds, user requirements, future-work list |
| `PP2_presentation-final.pptx` (Progress Presentation 2) | **Final presented research direction:** main objective, solutions summary, architecture, completed components, technology layers |
| TrafficEye Research Website Content Summary | **Primary evidence of implementation and evaluation:** features, workflow, formulas, constants, results, limitations |
| `TrafficEye_Website_Assets_Pack.zip` (`ASSET_MANIFEST.md`, `MISSING_ASSETS.md`, 32 images, 1 CSV) | Images, captions, evidence types and warnings, exclusion list |
| `05g_model_comparison_table.csv` | Values in the model comparison chart and table |
| WHED entry for SLIIT (whed.net, IAU-015707) | University postal address and website on the Contact page |

The CareerNet reference site (careernet-research.vercel.app) was inspected page by page (Home, Domain, Milestones, Documents, Presentations, About Us, Contact Us) as the **layout reference** for this rebuild: light theme, intro band and sticky navigation, research-at-a-glance steps, stats strip, gap → problem → solution cards, numbered portfolio cards, progress panel and dated timeline, numbered document cards, navy feature banner with four presentation cards, supervisor and researcher cards, and a map/details/form contact page. The pages were read as text; no screenshots of the reference were attached to this conversation, so colours and spacing were matched from its structure rather than pixel comparison. No CareerNet text, data, dates, marks, names, logos, images or code were copied.

## 2. Information taken from the proposal (March 2026)

- Background: 95% of passenger and 97% of freight traffic by road [1]; Suwa Seriya response times of 11 min 32 s (Colombo) and 14 min 49 s (island-wide) [8].
- Literature themes and their limitations (Domain section A), cited with the proposal's numbering.
- References [1]–[20], **reproduced exactly as listed in the proposal**. They were not independently re-checked against publishers. Some bibliographic details (for example volume numbers) should be verified before final submission.
- The original research gap, main objective and six specific objectives. All are shown in collapsible panels labelled "Original proposal, not implemented".
- Degree ("B.Sc. (Hons) Degree in Information Technology Specialized in Information Technology"), department, and supervisor titles (Mrs. Shashika Lokuliyana, Mr. Ashvinda Iddamalgoda) from the cover page and acknowledgement.
- The group project's other components and members are **not shown** anywhere on the rebuilt website. Only the overall group project title appears, as one line of context. The original proposal PDF, which names group members, is included unchanged.

## 3. Information taken from PP1

- Title: "Density Monitoring and Decision-Support System".
- Panel feedback and the response: the vehicle-count rule 0 = CLEAR, 1–4 = LOW, 5–10 = MEDIUM, 11+ = HIGH.
- Problem and impact points (Domain C, "How the framing evolved").
- The six user requirements (Domain D, collapsible).
- The eight future-implementation items (Domain H, labelled "Planned, not implemented").
- PP1 slide 6 is titled "User Feedback on Prototype". The Content Summary states no user or officer testing was done, so the website reports these items only as panel feedback and claims no user testing.

## 4. Final methodology information from PP2

- The main objective is quoted verbatim, with a note that the prototype was not evaluated for "optimal" timing, analyses recorded rather than "real-time" video, and has only prototype-level validation.
- The five-part solutions summary is written as specific objectives, each paired with its implementation and evidence status.
- Architecture concepts: FIFO queue positions P1…Pn, vehicle length L, standstill gap 1.177 m, distance D, effective discharge speed S, T = D / S, safety buffer.
- The architecture slide is shown unchanged as a thumbnail ("PP2 slide, as presented"), next to a table recording every difference from the implemented prototype: video input, tracking, classes, position groups, illustrative 60 s value, dashboard features, storage.
- Technology layers. Items PP2 lists but the summary shows as unused (Leaflet maps) or unverified (Material Symbols, Context API, ESLint 9, CORS) are listed separately in a note.
- PP2 illustrative values ("60 seconds", "72% HIGH", "28 vehicles", "120 FPS", "<1.5 s") are **not used as results** anywhere. The Presentations page says they are design illustrations.

## 5. Implementation details verified by the Content Summary

All of the following appear on the site as implemented:

- Officer login (24 h token, bcrypt); video upload with date and time.
- Camera-view check (ORB + RANSAC; two calibrated views; "calibration required" on mismatch).
- YOLOv8n, 7 classes, every 10th frame, confidence 0.4 (0.25 and 0.30 rejected).
- Lane-polygon filter (bottom-centre of box); queue snapshot = sampled frame with most vehicles; ordering by distance to the reference line; groups P1, P2, P3–4, P5+.
- D_i = ΣL + (i − 1) × 1.177 m; lengths Motorcycle 2.0, Bicycle 1.9, Tuktuk 2.5, Car 4.3, Ambulance 5.5, Truck 8.5, Bus 10.8 m.
- T_raw = D ÷ V(class, group); T_fifo,i = max(T_raw,i, T_fifo,i−1); recommended green = clearance + 3.12 s.
- Ambulance advisory: frontmost ambulance clearance + 3.12 s, HIGH, shown alongside the normal recommendation.
- Results page, annotated video, MongoDB Atlas history and overview.
- Offline calibration: ByteTrack used only for calibration and validation, outlier rules (< 0.5 s, > 15 m/s), 28-row lookup table.
- Technologies and versions (Python 3.12, Ultralytics 8.4.x, PyTorch 2.11, OpenCV 4.13, FastAPI, React 18, Vite 5, Tailwind CSS 4, MongoDB Atlas and others).

The worked example in Diagram 3 computes D_1–D_4 for the clip_02 queue (4.30, 7.48, 10.65, 13.83 m) from the summary's own constants. Per-vehicle speeds are not shown because the lookup-table values were not supplied.

The "same count, different queue" illustration on Home (14.71 m against 35.11 m) is arithmetic using the model's lengths and gap. It is labelled "Illustration, not a result".

## 6. Evaluation results: the August 2026 model

These figures describe **only the YOLOv8n model trained on 17 August 2026** (dataset v2). That model was used for calibration, the clearance check and the acceptance audit.

- Precision 0.802, recall 0.794, mAP50 0.845, mAP50-95 0.594 (YOLOv5n: 0.769 / 0.796 / 0.836 / 0.537); parameters 3.01 M against 1.77 M; training time 0.51 h against 0.82 h.
- Per-class mAP50: Ambulance 0.950, Bicycle 0.919, Bus 0.913, Car 0.863, Tuktuk 0.837, Motorcycle 0.730, Truck 0.706.
- Graphs `eval-v8-*`, `eval-v5-pr-curve`, `eval-label-distribution`; prediction and label mosaics `det-*`.
- Queue snapshots `queue-clip02`, `queue-clip11` (acceptance audit, 28 Aug 2026).
- Calibration: 11 clips, 41,966 frames, 344 crossings, 328 matched, 283 after cleaning, positions 1–4, 15 of 28 groups. The 37 "clip_12" rows are excluded.
- Safety margin: 289 gaps, median 2.90 s, P85 6.02 s, margin 3.12 s.
- Clearance check: clip_01 6.16 / 13.46 / −7.30; clip_02 4.41 / 4.50 / −0.09; clip_11 8.79 / 8.93 / −0.14; MAE 2.51 s, RMSE 4.22 s.
- Acceptance audit: all phases passed (3 uploads, 4/4 recalculations, 17 checks × 4 responses, repeatability, 17 stress queues, frontend fields).

The paper's older Table III values (0.7434 / 0.7555 / 0.7954 / 0.6035, April 6-class model) are **not used**.

## 7. Screenshots from the October 2026 prototype (`cctv_v3`, not evaluated)

Every image in `assets/images/dashboard/` was captured on 9 October 2026 with the model installed on 6 October 2026, or shows records partly produced by it. All carry the amber tag "Interface demo, Oct 2026 model (not evaluated)". Their numbers are never presented as results:

- `ui-recommendation`, `ui-results`, `ui-queue-table`: 26.65 s, 23.53 s, 10 vehicles; the "Bicycle" and two "Trucks" are unverified.
- `ui-emergency`: 8.22 s, 11.34 s, 22.59 s. The ambulance's P3–4 speed rests on untraceable rows. The caption says it is not proof of reliable ambulance detection.
- `ui-overview`: the 77 "emergency detections" are stated to be mostly false positives.
- `ui-history`: the caption notes that some emergency rows are false positives.
- `ui-login`, `ui-new-analysis`: interface only.

UI wording such as "Optimal Green Phase" and "Real-time command and control" is identified as interface text, not a research claim.

## 8. Missing academic information (shown as "To be confirmed")

- The researcher's email and both supervisors' emails (no email was guessed). A phone number is not shown. The contact form stays disabled until an email is added; it then opens the visitor's own email app and never claims to send anything itself.
- The full citation for Gunarathne et al. (2023).

### 8a. Milestone schedule and assessment weights (correction of 10 October 2026)

- At the student's explicit request, the Milestones page now uses the schedule format of the reference portfolio (careernet-research.vercel.app/milestones): 60% progress, 6 of 10 completed, timeline November 2025 to 28 October 2026, current milestone "Draft Thesis & Website Submission", due 11 October 2026.
- **Provenance:** the dates, statuses and percentages were supplied by the student as the intended website schedule and taken from that reference page. The Progress Presentation 1 date (11 – 13 May 2026, 15% of final mark) was read from the reference page on 10 October 2026. The other dates and marks are exactly those listed by the student.
- **Not independently verified:** none of these dates or percentages were checked against an official SLIIT course assessment scheme. **Confirm them against the official module outline before final submission.**
- Weights shown: Proposal Presentation 12%, PP1 15%, PP2 18%, Website (Draft Thesis & Website Submission) 2%, Final Presentation & Viva 20%, Research Paper 10%, Final Thesis 19%. No percentage is given for milestones 01–03, and no total is stated, because the supplied breakdown does not establish one.
- The TAF's January 2026 date is consistent with the scanned PDF's creation date (13 January 2026).

## 9. Missing documents and presentations

| Item | Website status |
|---|---|
| Topic Assessment Form | **Available** since 10 October 2026: `documents/TAF_R26-IT-056.pdf`, the student's scanned 8-page form (4.7 MB), byte-identical to the supplied `Taf-R26-IT-0561(1).pdf`. It names the group project and uses the identifier 26-IT-56; its pages are unaltered, and no details from it were added to the website. |
| Group thesis | Not listed (would describe other members' work) |
| Project Charter | Not available |
| Research checklists | Pending |
| Research paper | Pending (the summary mentions one; it was not supplied) |
| Individual thesis / final report | Pending |
| Proposal presentation slides | Not available |
| Final presentation slides | Pending |
| PP1 and PP2 original .pptx files | Kept outside the website (about 12.9 MB each); PDF viewing copies included |

No placeholder PDFs or external links were created for missing items.

## 10. Limitations that must not be misrepresented

1. The prototype analyses **recorded video** on a **local machine**. It has no live CCTV input and no hosted deployment.
2. **One site, one lane, daytime only**, from one calibrated fixed camera (two calibrated views).
3. Validation images share source videos with training, so detection scores are likely optimistic. The test split was not evaluated, and the best epoch was 49 of 50.
4. **Ambulance detection is unreliable** on the project camera: false "Ambulance" detections appeared in 8 of 11 normal clips. Image 06e is used only as a limitation.
5. The calibration lookup has real observations for **15 of 28** groups and positions 1–4 only. Other groups, including P5+, use fallback values or the 37 untraceable "clip_12" rows.
6. The clearance check is **3 cases from calibration clips**: a prototype check, not independent validation.
7. There has been no officer or user testing, no latency measurement and no field trial.
8. TrafficEye does **not control traffic signals**, and integration with the other group components has not been built.
9. The October 2026 `cctv_v3` model has **not been evaluated** inside TrafficEye.
10. Not implemented and not presented as features: live CCTV, signal control, multi-lane or four-way analysis, night, rain or thermal operation, Raspberry Pi edge deployment, the Settings page, a registration screen, the map view, hosted deployment.

## 11. Image handling and privacy

- Images were converted to compressed WebP copies. The originals are untouched.
- "Demo Access (login recovery)" was removed from the sidebar of `ui-overview`, `ui-new-analysis` and `ui-history`. The results screenshot was cropped to exclude the sidebar.
- One readable number plate in the validation mosaic `det-predictions` was pixelated. Project-camera frames were already redacted in the asset pack.
- The researcher portrait is a crop of the student's own PP2 title slide. To use a different photo, replace `assets/images/profile/researcher-portrait.webp`.
- Nothing from the manifest's exclusion list is used: April 6-class model outputs, out-of-date validation snapshots, scatter plots containing clip_12, mislabelled diagnostic frames, PP2 slide graphics as evidence, and unrelated coursework images.
- No local file paths, credentials, tokens, database connection strings or private notes appear on any public page.

## 12. Verification performed (rebuilt site)

- Original uploads checked by SHA-256: PP1, PP2, guideline and proposal are unchanged. The website's proposal PDF is byte-identical to the original. The previous ZIP is untouched.
- Link check: 270 internal references across 8 pages, no missing files or anchors, no duplicate IDs.
- Group-member scan: no other member's name, student ID, photo or component description appears in any HTML page.
- Rendered in Chromium at 360, 390, 768, 1024 and 1440 px: no horizontal overflow and no JavaScript errors on any page.
- 23 interaction tests passed: seven-link navigation with one active page on every page, milestone dropdown and deep links, lightbox (open, next, close), section highlighting, back-to-top, presentation order (Proposal, PP1, PP2, Final), PP1/PP2 links, disabled email button, copy template, mobile menu open and navigate, navigation without JavaScript.
- Deployable folder size: about 7.5 MB, under the 20 MB limit.

### Targeted correction (10 October 2026): Milestones page and TAF document only

- Started from the delivered `TrafficEye_Research_Website_Rebuilt_Final.zip`; every file was hashed before and after.
- Changed: `milestones.html`, `documents.html`, `assets/css/style.css` (new scoped rules appended at the end only; the original CSS text is byte-identical) and this file. Added: `documents/TAF_R26-IT-056.pdf`.
- Byte-identical to the previous version: `index.html`, `domain.html`, `presentations.html`, `about.html`, `contact.html`, `404.html`, `assets/js/main.js`, all images, fonts, the proposal PDF and the PP1/PP2 viewing copies.
- Documents page: only entry 01 and the counter (now 2 of 6 available) changed; entries 02–06 are unchanged.
- Browser tests (Chromium) all passed:
  - 60% and 6 of 10 completed, with segments 6 / 1 / 3
  - all 10 dates, statuses and marks, laid out as date left, dot centre, details right
  - no "TBC" and no stated total
  - dropdown jump works
  - TAF card shows Available, PDF and 8 pages, with Open (new tab) and Download links
  - the downloaded TAF is byte-identical to the supplied file
  - no horizontal scroll at 390 px, and no JavaScript errors
- Served over HTTP, all four PDFs return `application/pdf`. Link check: 273 references, 0 problems. Folder size about 12.1 MB, under 20 MB.
