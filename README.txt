TAHMINA AKTER — ANIMATED PORTFOLIO
===================================

FILES
- index.html
- css/style.css
- js/script.js
- assets/tahmina-akter-hd.png
- assets/tahmina-akter.png (original supplied portrait)
- assets/Tahmina_Akter_CV.docx

RUN LOCALLY
1. Extract the ZIP.
2. Keep the folder structure unchanged.
3. Open index.html in a modern browser.

CV DOWNLOAD / REPLACEMENT
The Download CV buttons currently download:
  assets/Tahmina_Akter_CV.docx

To update the CV later, replace that file with the new CV document and keep
the exact same filename. If you prefer a PDF CV, save it in the assets folder,
then update the two CV button href values in index.html to the PDF filename.

PROFILE PHOTO
The website uses assets/tahmina-akter-hd.png, the newly prepared high-resolution
portrait version. Upscaling improves display size, but cannot
recreate detail that was not present in the original low-resolution image.
For genuinely sharper results, replace it with a high-resolution original photo
using the same filename.

TECHNOLOGIES
HTML5, CSS3, Bootstrap 5.3.3, Bootstrap Icons, JavaScript, Google Fonts.
An internet connection is required for CDN-hosted Bootstrap, icons and fonts.

CONTACT FORM
The contact form prepares an email in the visitor's default email application.
It does not store or transmit messages to a server. Configure a form backend
if you want to receive submissions without the visitor's email app.

SKILLS
Laravel, PHP, Livewire, JavaScript, MySQL, Bootstrap, Tailwind CSS, Git,
GitHub and Web Applications. The hero includes animated floating badges for Clean Code, Laravel, PHP,
JavaScript, Livewire, MySQL, Bootstrap, Tailwind CSS, Git & GitHub, and Web Apps.
Skill bars are illustrative design elements, not verified proficiency scores.

SKILL BADGE MOTION
The hero skill badges now use a more visible alternating vertical float animation
(approximately 32 pixels of up/down travel) with staggered timing.

CUSTOM LOGO
- assets/tahmina-logo.svg is the custom scalable TA monogram.
- It is used in the navbar, footer and browser favicon.
- To change its colors or shape, edit the SVG file.

REFERENCE-INSPIRED REDESIGN
- Hero section redesigned to closely match the supplied screenshot.
- Dark navy / violet background, gradient headline and glowing circular portrait.
- Ten colorful skill badges continuously float up and down at staggered timings.
- Navigation includes Home, About, Experience, Projects, Skills, Education and Contact.
- Custom TA logo and CV download buttons retained.
- CV file path: assets/Tahmina_Akter_CV.docx
- Replace the CV at that exact path/name to update the download.

ALWAYS-ON ANIMATION UPDATE
- All 10 skill badges around the portrait animate automatically in an
  infinite up/down loop; animation does not require hover.
- Hovering a badge only highlights it and does not pause the movement.
- Portrait orbit rings and lower hero waves have subtle continuous motion.
- The reduced-motion accessibility setting disables continuous animation.

REFERENCE-STYLE JAVASCRIPT INTERACTIONS
- Cursor-following ambient glow.
- Pointer-responsive 3D tilt on the portrait stage.
- Pointer-responsive 3D tilt on project cards.
- Continuous typewriter typing/deleting loop with multiple developer phrases.
- Scroll-triggered reveal animations and animated hero counters.
- Active navigation highlighting based on the section in view.
- Skill badges continue their independent automatic CSS animation loops.

SKILL BADGE UPDATE
- Removed hover interactions from the floating skill badges.
- All 10 skill badges use the requested CSS animation:
  animation: float 5s ease-in-out infinite;
- Each badge has a staggered animation delay and moves vertically by 20px.
- Badges animate automatically; mouse hover does not trigger or control them.

LATEST FIX — TYPEWRITER + RESTFUL API
- Restored the #typedText element ID required by js/script.js.
- The hero tagline now types and deletes phrases continuously again.
- Added RESTful API as an additional floating skill badge.
- Preserved all previous JavaScript interactions: cursor glow, 3D portrait tilt,
  project-card tilt, scroll reveals, counters, and active navigation.
- All skill badges retain automatic 5-second float animation and no hover action.
