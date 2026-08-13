# Mason Yarbrough - personal website

A lightweight personal site for Mason's robotics work, open hardware build logs, research notes, essays, beliefs, and past projects.

## Local preview

Open `index.html` directly or serve the directory with any static file server:

```bash
python3 -m http.server 4321
```

Use the served version rather than `file://` when checking a post, since posts reference `/blog.css`, `/blog.js`, and `/images/...` by absolute path.

## Layout

```
index.html              home
blog/index.html         build log index
blog/<slug>/index.html  one post
blog.css                post layout, on top of styles.css
blog.js                 shared post behavior (share links, looping video)
entries/                markdown sources and the post template
images/<post>/          originals in photos/ drawings/ data/, web assets in web/
```

URLs have no trailing slash (`trailingSlash: false` in `vercel.json`), so a post lives at `/blog/<slug>`.

## Publishing a build log

1. Copy `entries/_post-template.html` to `blog/<slug>/index.html` and replace every `{{PLACEHOLDER}}`. The template's header comment lists the figure classes.
2. Put the originals in `images/<post>/` and build web copies into `images/<post>/web/`:
   ```bash
   cwebp -q 82 -resize 1600 0 photo.jpeg -o web/photo.webp
   ```
   Clips are better as video than gif:
   ```bash
   ffmpeg -i clip.gif -vf "scale=1440:-2:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -crf 23 -movflags +faststart -an web/clip.mp4
   ```
3. Render a 1200x630 share card to `images/<post>/web/og-<slug>.jpg`. Every `og:` and `twitter:` tag needs an absolute `https://masonyarbrough.com/...` URL or the preview will not render on X, Slack, or Substack.
4. Add an `<li>` to the top of the list in `blog/index.html`.
5. Set `width` and `height` on every image so the page does not reflow while it loads.

The share buttons and the copy-link button need no per-post editing: `blog.js` rebuilds them from the page's canonical URL and `og:title`.

## Stack

- Semantic HTML
- Responsive CSS
- Vercel static hosting
