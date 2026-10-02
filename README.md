# iOS Developer Portfolio

A responsive, dependency-free portfolio built with semantic HTML, CSS, and vanilla JavaScript. There is no build step.

## Preview locally

Open `index.html` directly, or serve the repository root with any static file server. For example:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Portfolio content

The portfolio profile includes information from the supplied LinkedIn PDF: professional experience, education, skills, languages, and academic highlights. Project links point to public GitHub repositories already linked by the previous portfolio.

Current employer work is described at a high level. Project thumbnails are optimized local JPEGs in `static/image/projects/`.

## Contact form

The contact form uses the Formspree endpoint configured in `index.html` to store submissions and send email notifications. Confirm the notification email in the Formspree dashboard. The free plan currently includes 50 submissions per month and a 30-day submission archive. The email link is also available as a direct contact option.

## Site files

The page title, description, social preview metadata, favicon, and social image are in `index.html` and `assets/`. The layout and responsive styles are in `static/css/portfolio.css`; mobile navigation, reveal-on-scroll motion, and the Formspree contact form are in `assets/portfolio.js`.
