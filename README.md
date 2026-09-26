# iOS Developer Portfolio

A responsive, dependency-free portfolio built with semantic HTML, CSS, and vanilla JavaScript. There is no build step.

## Preview locally

Open `index.html` directly, or serve the repository root with any static file server. For example:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Portfolio content

The portfolio profile now includes information from the supplied LinkedIn PDF: professional experience, education, skills, languages, and academic highlights. Project links point to public GitHub repositories already linked by the previous portfolio. The contact form opens a prefilled email draft; it does not submit to a server.

Current employer work is described at a high level; no confidential project details are included. Review profile and project details before publishing.

Project thumbnails are optimized local JPEGs in `static/image/projects/`.

The page title, description, social preview metadata, favicon, and social image are in `index.html` and `assets/`. The layout and responsive styles are in `static/css/portfolio.css`; mobile navigation, reveal-on-scroll motion, and the contact email draft are in `assets/portfolio.js`.
