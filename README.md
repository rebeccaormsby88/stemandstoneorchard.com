# Stem & Stone Orchard website

A static, responsive website ready for GitHub Pages.

## Pages
- `index.html` — current harvest, price, hours, directions and weekly update
- `about.html` — Rebecca's story and What We Grow
- `visit.html` — directions, hours and contact information

## Updating current information
In `index.html`, search for these comments:
- `CURRENT HARVEST`
- `THIS WEEK AT THE ORCHARD`

The site uses only the original logo and photographs supplied by Stem & Stone Orchard. Images are cropped by CSS but not replaced or altered.

## Publish with GitHub Pages
1. Upload all files and folders to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.

## Orchard Journal (new)
- `journal.html` is a blog-style page with a permanent navigation link on every page.
- To publish a new update every two weeks, edit `journal.html`. Find `NEW JOURNAL POSTS`, duplicate the existing `<article class="journal-post" ...> ... </article>` block and paste the copy ABOVE the previous post.
- Change the article `id` to a unique lowercase hyphenated phrase (example `november-orchard-news`), add the real date in the `journal-date` paragraph, replace the title and body, and update the permalink's `href` to match the new id.
- Link directly from Brevo emails using `https://stemandstoneorchard.com/journal.html#november-orchard-news` (substitute your actual article id).
- The welcome post is deliberately undated and does not claim any current fruit availability.
- The journal sidebar links to the existing Brevo-hosted signup form.
