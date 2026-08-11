# Welcome

This site is published in **English**, **French** and **German**.

Most text is written once in English and translated separately — you don't rewrite a page for each language. Blog posts are the exception: those have a real file per language.

## Quick links

- [Pages](cloudcannon:collections/pages)
- [Blog](cloudcannon:collections/posts)
- [Blog (Français)](cloudcannon:collections/posts_fr)
- [Blog (Deutsch)](cloudcannon:collections/posts_de)
- [Site-wide content](cloudcannon:collections/data)
- [Translations](cloudcannon:collections/locales)

## Editing pages

Open a page from **Pages** and edit it in the Visual Editor. Click any heading, paragraph or image to change it in place, or use the sidebar for anything that isn't directly on the page.

Pages are built from blocks — hero, left/right, featured posts. Use the **+** control to add one, drag to reorder, and the bin icon to remove.

Editing a page here always edits the **English** version. Translations are handled separately, below.

## Translating a page

With a page open in the Visual Editor, look for the floating **translate button** in the corner. It lists **Original**, **FR** and **DE**.

Pick a language and the page redraws in it. Any text that has a translation shows it; anything untranslated shows the English text. Click a piece of text to edit the translation, exactly as you'd edit the page itself.

Three things to know:

- **Only text is translated.** Images, colours, links and layout are shared across every language. Change an image and it changes everywhere.
- **The sidebar always edits English.** Even while you're viewing French, the sidebar inputs are the English source. Use the on-page editors for translations.
- **Some text isn't on the page.** Page titles and search-engine descriptions live in the head of the document. Find those under [Translations](cloudcannon:collections/locales).

You can drag the translate button somewhere else if it's covering something.

## Keeping translations up to date

When someone edits the English text, its translations don't change — they'd otherwise silently go out of date without anyone noticing. Instead they're flagged.

- Out-of-date translations get a **dashed outline** — grey while you're viewing the original, yellow while you're viewing that language.
- The translate button shows a **count** of how many need review.
- Open the review panel from the button to step through them. Each one shows what the English text used to say and what it says now.
- If a translation is still fine, mark it reviewed. There's a **Mark all as reviewed** action when a change was cosmetic.

## Blog posts

Blog posts work differently from the rest of the site. Each language has its own collection:

- [Blog](cloudcannon:collections/posts) — English
- [Blog (Français)](cloudcannon:collections/posts_fr)
- [Blog (Deutsch)](cloudcannon:collections/posts_de)

Open a post in its own collection and write in that language — title, body, image descriptions, the lot. There's no translate button on a post page, because the post *is* the translation.

The three versions of a post are linked by their **file name**, which is what keeps `/en/blog/my-post/`, `/fr/blog/my-post/` and `/de/blog/my-post/` pointing at each other. So:

- Adding a post means adding it to **each** language collection, with the **same file name**.
- Adding is switched off in the French and German collections to prevent a mismatched name. Ask a developer to add the file, then edit it here.

### The blog listing page

The page that lists all the posts is shared across languages, so its heading is translated with the translate button rather than by editing three files. The post titles in that list come from the posts themselves, so they're already in the right language.

### Tag names

Tag names are translated once and reused everywhere they appear — on a post, in the listing, and as the tag page heading. Find them under [Translations](cloudcannon:collections/locales), grouped as `tags:`.

The web address of a tag page stays in English (`/fr/blog/tags/marketing/`). That's intentional — it keeps existing links working.

## Site-wide content

The header, footer and navigation come from [Site-wide content](cloudcannon:collections/data):

- **navigation** — header and footer links, logos, social links, copyright.
- **site** — site title, description and the default sharing image.
- **colors** / **icons** — the palettes offered in dropdowns elsewhere.
- **tags** — the list of tags a post can be given.

Link labels here are translated with the translate button, like any other shared text.

## All translations in one place

[Translations](cloudcannon:collections/locales) holds every translated string, one file per language. Each entry shows the **Original Text** (read-only) and the **Translation** you can edit.

Most of the time the translate button is easier. Use this view when you want to work through a lot of text at once, or for text that never appears on the page itself:

- `page_title` and `page_description` — browser tab and search results
- `tags:` — tag names
- `tag_page_titles:` — the browser tab title of each tag page

Don't add or remove entries here. They're created automatically from the site's text.

## Publishing

Save your changes as you go. Translations are saved with the rest of the site, so a page and its translations publish together.
