# TrafficEye Research Portfolio — Website (rebuilt, light academic theme)

Individual research component website for **TrafficEye — Traffic Monitoring & Green Light Support System**, part of the group project *Smart Emergency Traffic Light Control System* (R26-IT-056), Sri Lanka Institute of Information Technology (SLIIT), 2026.

Researcher: T. A. D. T. Jayampathi (IT22294234)
Supervisor: Mrs. Shashika Lokuliyana · Co-supervisor: Mr. Ashvinda Iddamalgoda

The site is plain **HTML5, CSS3 and vanilla JavaScript**. It has no framework, build step, backend or database. It is separate from the TrafficEye application itself.

---

## 1. Open the website locally

**Option A, double-click.** Open `index.html` in a web browser. Every link uses a relative path, so the whole site works straight from the folder.

**Option B, local web server (closest to the live site).** In this folder run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

`404.html` uses root paths (`/assets/...`) because Vercel serves it for any missing address. It only displays correctly through a web server or on Vercel, not by double-clicking.

## 2. Deploy on Vercel

The folder is a ready-to-deploy static site. Pick one method.

**Vercel dashboard (no command line)**
1. Put this folder in a GitHub repository, with `index.html` at the repository root.
2. On vercel.com choose **Add New → Project** and import the repository.
3. Set **Framework Preset** to **Other**. Leave **Build Command** empty, and leave **Output Directory** empty (or `.`).
4. Click **Deploy**.

**Vercel CLI**

```bash
npm i -g vercel
cd TrafficEye_Research_Website_Rebuilt
vercel          # preview deployment
vercel --prod   # production deployment
```

`vercel.json` sets caching for `/assets/`. `.vercelignore` keeps `README.md` and `CONTENT_VERIFICATION.md` off the public site.

## 3. Submit to SLIIT

The guideline allows at most **20 MB** and HTML/CSS. This folder is about **7.5 MB** before compression.

- Upload the folder contents (or `TrafficEye_Research_Website_Rebuilt_Final.zip`) to the course web.
- If you don't want the content-verification notes to be public, leave `CONTENT_VERIFICATION.md` out of the upload.

## 4. Folder structure

```text
TrafficEye_Research_Website_Rebuilt/
├── index.html            Home
├── domain.html           Domain: literature, gap & problem, objectives, methodology,
│                         technologies, results, limitations (sections 01–07)
├── milestones.html       Milestones (progress panel, dated timeline, dropdown, marks table)
├── documents.html        Documents
├── presentations.html    Presentations
├── about.html            About Us
├── contact.html          Contact Us
├── 404.html              Not-found page for Vercel
├── assets/
│   ├── css/style.css     Complete design system and layout
│   ├── js/main.js        Mobile menu, lightbox, milestone selector, section highlight, back-to-top, copy button, email form
│   ├── fonts/            Inter variable font (SIL Open Font License) and its licence
│   ├── graphics/         TrafficEye mark and favicon (original SVGs)
│   └── images/
│       ├── dashboard/    Real TrafficEye app screenshots (website copies, redacted)
│       ├── detection/    YOLOv8n validation predictions and labels
│       ├── methodology/  Lane region, calibration, tracking and queue images
│       ├── results/      Evaluation graphs and validation evidence
│       ├── presentations/ Slide thumbnails
│       └── profile/      Researcher portrait (cropped copy from the PP2 title slide)
├── documents/            Research proposal report (original PDF, unchanged)
├── presentations/        PDF viewing copies of PP1 and PP2
├── vercel.json
├── .vercelignore
├── README.md
└── CONTENT_VERIFICATION.md
```

## 5. Fill in the remaining details

Missing information is shown on the site with a dashed amber **"To be confirmed"** or **"To be added"** label. To finish the site, search the HTML files for `tbc` or `To be confirmed`.

| What | File | How |
|---|---|---|
| Your email | every page (footer), `about.html`, `contact.html` | Search for `Email to be added` and replace the `<span class="tbc">…</span>` with `<a href="mailto:you@example.com">you@example.com</a>` |
| Enable the contact form | `contact.html` | Put your address in `data-recipient=""` on `<form id="contact-form">`. The button then opens the visitor's email app with the message filled in (there is no server) |
| Supervisor emails | `about.html` | Same pattern, two places |
| Milestone dates, marks, statuses | `milestones.html` | In each `<li class="tl …">` edit `tl__date`, the status badge and the `marks-badge`. Change the class `tl--unconfirmed` / `tl--upcoming` / `tl--current` / `tl--done` to match. Update the progress panel and the Assessment marks table |
| New documents (Charter, TAF, checklists, paper, thesis) | `documents.html` | Put the PDF in `documents/`, then copy the buttons from the proposal card and point them at the new file |
| Proposal or final presentation slides | `presentations.html` | Put the PDF in `presentations/` and copy the PP1 card |
| Gunarathne et al. (2023) full reference | `domain.html` | Search for `Gunarathne` |

The map on the Contact page is a Google Maps embed. It needs an internet connection; without one the page shows a short note and the "Open in Google Maps" link instead.

## 6. Original files

- `documents/IT22294234_Proposal_Presentation_Report.pdf` is a byte-identical copy of the supplied proposal.
- The PP1 and PP2 **.pptx originals (about 12.9 MB each) are not included**, because they would push the site past 20 MB. They remain unchanged with the student. The site links to PDF viewing copies exported from them, with no slide content changed.
- Website images are compressed WebP copies. Account names, number plates and close-up faces are redacted on these copies only; the original screenshots are untouched.

## 7. Credits and licences

- Typeface: **Inter**, © The Inter Project Authors, SIL Open Font License 1.1 (`assets/fonts/INTER-OFL-LICENSE.txt`).
- Detection validation images: Roboflow "Vehicle detection" dataset v2, **CC BY 4.0**.
- All diagrams, charts, icons and the TrafficEye mark were drawn for this website. No institutional logo is used.

## 8. Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile. The site has been checked at 360, 390, 768, 1024 and 1440 px. It respects the reduced-motion setting, and navigation still works with JavaScript turned off.

## 9. Previous version

`TrafficEye_Research_Website_Final.zip` (the earlier dark-theme version) is kept unchanged as a backup. This rebuilt site reuses only its verified content, images and PDF viewing copies.
