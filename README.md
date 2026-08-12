# Eleventy Multilingual CloudCannon Starter

A starting point for developers building a **multilingual** website with Eleventy, using [Rosey](https://rosey.app/) and the [Rosey CloudCannon Connector](https://github.com/CloudCannon/rcc) for translations, and CloudCannon editable regions for visual editing.

See a [demo site](https://quiet-plane.cloudvent.net/).

The site ships in English, French and German. Editors translate a page by clicking the connector's floating translate button in the Visual Editor; developers can edit the locale files directly. Both write to the same place.

This is the Eleventy counterpart of the [Rosey Astro Starter](https://github.com/CloudCannon/rosey-astro-starter).

Create your own copy, and start creating your own components to use in the CloudCannon CMS.

This template is aimed at helping developers build sites quickly, rather than providing editors with a fully built editable site.
If you are an editor looking for an already built template, have a look at [CloudCannon's templates page](https://cloudcannon.com/templates/).

## Getting Started

To start using this template, go to the GitHub repository and click `Use this template` to make your own copy.

### Local Development

1. Clone the repository
2. At the root of the project, run `npm install`, to install the node modules.
3. Run `npm start`. Eleventy will generate and serve your site from a folder called `_site`.

### Linting

[Biome](https://biomejs.dev/) handles both formatting and linting. `npm run lint` checks, `npm run biome` writes the fixes. The `Lint` GitHub Action runs the check on pushes and pull requests to `main`.

Two things about `biome.json` are worth knowing before you edit it, because neither is obvious and it takes no comments of its own:

- `complexity/useArrowFunction` is off. Eleventy only gives a shortcode or filter `this.page`/`this.ctx` when it's declared with `function`, so converting those callbacks to arrows quietly removes context a later edit would expect to find.
- Biome only sees hand-written code. The `.html` templates are Liquid, which its HTML parser can't read; `package.json`, `package-lock.json`, `rosey/`, `.cloudcannon/` and `src/_data/*.json` all belong to other tools. The data files in particular are written back by the CloudCannon editor in its own format, so linting them would fail CI on content edits no one can fix from the CMS.

### CloudCannon skills for AI coding agents

If you build with an AI coding agent (Claude Code, Cursor, Copilot, etc.), install CloudCannon's [agent skills](https://github.com/cloudcannon/agent-skills). These teach your agent how CloudCannon configuration, editable regions, and snippets actually work, so it stops guessing.

Install all of them into this project:

```bash
npx skills add cloudcannon/agent-skills --all
```

Or pick the ones you need:

```bash
npx skills add cloudcannon/agent-skills --skill cloudcannon-visual-editing,cloudcannon-configuration
```

Available skills:

| Skill                        | Use it for                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `cloudcannon-visual-editing` | Adding Visual Editor support, setting up editable regions, debugging visual editing              |
| `cloudcannon-configuration`  | Writing `cloudcannon.config.yml` — collections, inputs, structures, select data, collection URLs |
| `cloudcannon-snippets`       | Adding snippets to markdown content and configuring the Content Editor                           |
| `cloudcannon-dev-server`     | Driving the local CloudCannon dev server to check what the Visual Editor actually rendered       |
| `local-dev-servers`          | Starting, identifying and cleaning up local dev servers and stray ports                          |
| `migrating-to-cloudcannon`   | Onboarding an existing SSG site to CloudCannon                                                   |
| `make-site-multilingual`     | Adding the Rosey/RCC translation stack to a site — the procedure this starter follows            |
| `translate-multilingual`     | Translating `rosey/locales/*.json` and per-locale content files                                  |
| `brainstorming`              | Exploring intent and design before a migration or larger change                                  |

Useful flags:

- `-g` / `--global` — install for your user instead of just this project.
- `-l` / `--list` — list the skills in the repo without installing.
- `-a '*'` — install to every supported agent, not just the detected one.

Skill files land in `.agents/skills/`, with agent-specific directories such as `.claude/skills/` symlinked to them, and the installed versions recorded in `skills-lock.json`. Commit `skills-lock.json` so teammates can restore the same set with `npx skills experimental_install`. Run `npx skills update` to pull in newer versions, `npx skills ls` to see what's installed, and `npx skills remove` to drop them.

## Features

- [Multilingual](#multilingual)
- [Editable regions](#editable-regions)
- [Styling](#styling)
- [Blog with pagination & tags](#blog-with-pagination--tags)
- [Data files](#data-files)
- [Image Optimization](#image-optimization)
- [Optimised for editing in CloudCannon](#optimised-for-editing-in-cloudcannon)
- [SEO controls](#seo-controls)
- [Font Awesome Icons](#font-awesome-icons)

### Multilingual

The site is built in English, then translated into French and German by [Rosey](https://rosey.app/), which operates on the **built HTML** rather than on your templates.

#### The pipeline

Everything lives in `.cloudcannon/postbuild`, which runs after `npm run build`:

1. `rosey generate` scans `_site` for `data-rosey` attributes and collects them into `rosey/base.json`.
2. `rosey-cloudcannon-connector write-locales` syncs those keys into `rosey/locales/{fr,de}.json` and writes the locale manifest to `_site/_rcc/locales.json`.
3. `rosey-cloudcannon-connector install-client` copies the browser client to `_site/_rcc/client.mjs`. Eleventy doesn't bundle browser JS, so `layout.html` imports that URL rather than a bare specifier.
4. `rosey build` reads the locale files and writes the translated site.

> **The site must set `CLOUDCANNON_SYNC_PATHS=/rosey/`.** Without it, CloudCannon doesn't sync the locale files back to the repository and **translations are lost on every build**. It's already in `.cloudcannon/initial-site-settings.json`.

#### URL structure

`rosey build` runs **without** `--default-language-at-root`, so every language is served under a prefix:

| URL                                      | What it is                                         |
| ---------------------------------------- | -------------------------------------------------- |
| `/`                                      | A Rosey-generated redirect page                    |
| `/en/`, `/en/blog/`, `/en/blog/my-post/` | English — relocated from the root by `rosey build` |
| `/fr/…`, `/de/…`                         | French and German                                  |

Eleventy itself **must not** emit `/en/`. It builds English at the root and `rosey build` moves it. Emitting `/en/` in a permalink would produce `/en/en/`. Only the per-locale blog directories carry a prefix in Eleventy, because Rosey doesn't generate those pages.

#### Two ways content gets translated

|               | Rosey keys                                                                                             | Split by directory                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Used for**  | Shared UI: nav, footer, headings, buttons, page-builder blocks, tag labels, `<title>`/meta description | Blog post bodies and their frontmatter                                |
| **Lives in**  | `rosey/locales/{fr,de}.json`                                                                           | `src/pages/blog_fr/`, `src/pages/blog_de/`                            |
| **Edited in** | The Locales collection, or the connector's translate button in the Visual Editor                       | The Blog (Français) / Blog (Deutsch) collections, like any other post |

Post files share filenames across languages (`email-delivery-tips.md` in all three directories), because permalinks are derived from `page.fileSlug`, not the title. That's what keeps `/en/blog/x/`, `/fr/blog/x/` and `/de/blog/x/` aligned for the locale picker and tag links.

#### Keys and namespaces

- `data-rosey-root` is set on `<main>` from `page.filePathStem` (see `src/_data/eleventyComputed.js`). It's deliberately shared across pagination pages, so `/blog/` and `/blog/1/` don't mint duplicate keys, and `blog_fr/x` maps back to `blog/x`.
- Page-builder blocks are namespaced by `_uuid` (`data-rosey-ns="{{ _uuid }}"`), placed **inside** each component rather than on the loop in `component-page.html` — the loop element is what CloudCannon clones when a block is added or reordered.
- Tag chips use `data-rosey-root="tags"`, not `data-rosey-ns`. `root` resets the namespace, `ns` appends to it; appending would give a separate key per page (`blog:tags:bells`, `tags:tags:bells`) instead of one shared `tags:bells`.
- Button labels are wrapped in their own `<span data-rosey="button_text">` so the key captures the text without the icon markup.

#### Head and SEO text

Rosey scans `<head>`, and untagged head text is copied verbatim onto generated pages — so an untagged `<title>` stays English forever. Keys are **opt-in** per page via `rosey_seo: true` in frontmatter, with `rosey_title_key` / `rosey_description_key` overrides (`src/pages/tags.md` uses these for per-tag titles).

Opt-in is deliberate, not laziness: blog posts set `rosey_seo: false`, because their head already comes from their own translated frontmatter and a Rosey key would overwrite it.

#### Adding a language

1. Add the code to `LOCALES` in `_11ty_config/locales.js`.
2. Create `src/pages/blog_<code>/` with a `blog_<code>.11tydata.js` that calls the shared factory.
3. Add a `posts_<code>` collection and a `data_config.locales_<code>` entry to `cloudcannon.config.yml`, and put the collection in the Blogging group.
4. Add `'!blog_<code>/*'` to the `pages` collection's `glob` in `cloudcannon.config.yml`. Without it the new posts appear in both Pages and `posts_<code>`, and the Pages entry opens them with the wrong schema.
5. Add the code to `--locales` in `.cloudcannon/postbuild`, so the first build writes `rosey/locales/<code>.json`. Until that file exists the language is missing from `_rcc/locales.json` and the connector's switcher won't offer it.

Everything else — the locale picker, the `data-rcc-exclude` list, the tag pages, the blog listing — is derived from that one map.

There's no editor-facing way to do this: adding a language is a code change. Editors only ever see the result, in the connector's translate flow.

### Editable regions

[Editable regions](https://cloudcannon.com/documentation/articles/introduction-to-editable-regions/) let non-technical editors edit and build pages directly on the live preview in CloudCannon's Visual Editor.

Components are plain Liquid partials in `src/_includes/components/`. The `@cloudcannon/editable-regions` Eleventy plugin (wired up in `.eleventy.js`) marks parts of a component editable with `data-editable` attributes and re-renders them live as the editor types.

To create a new page-building component:

1. Add a Liquid partial in `src/_includes/components/`, e.g. `my-block.liquid`. Mark editable parts with `data-editable` attributes (`text`, `image`, `array`, `component`).

2. Add a co-located `my-block.cloudcannon.structure-value.yml` next to it, defining its `label`, `icon`, `preview`, default `value` (including a `_type: components/my-block` discriminator), and any component-scoped `_inputs`. It's picked up automatically by the `_structures.content_blocks` glob in `cloudcannon.config.yml` — no central edit needed.

3. The page builder (`src/_includes/layouts/component-page.html`) renders `content_blocks` as an editable array, so your new block is immediately available in the Add menu.

Give the structure value a `_uuid:` key so blocks get a stable Rosey namespace, and put `data-rosey-ns="{{ _uuid }}"` on the component's root element. See [Multilingual](#multilingual).

### Styling

TailwindCSS or SCSS/CSS are both configured to be usable within this project.

#### Tailwind CSS

Use [Tailwind](https://tailwindcss.com/) to add utility classes to your HTML, allowing you to style your components without leaving your HTML.
This can be used in combination with normal CSS and SCSS styling, leaving you to add styles to your site however you want.

To remove Tailwind CSS from the project:

1. Remove the following packages from your `package.json`:

```json
"dependencies": {
  "tailwindcss": "^x.x.xx"
}
```

2. Remove the `/src/assets/styles/tailwind.css` file. (Tailwind 4 is CSS-first — there is no `tailwind.config.*`.)

3. Remove calls to `npm run tailwind:build` and `npm run tailwind:watch`.

4. Remove existing utility classes and replace them with SCSS/CSS.

#### Hot reloading

Any changes to styling within the project will cause your local server to reload and reflect the changes.

#### Markdown styles

The markdown toolbar has all the options supported in the rich text editor, along with stylings to make them work.
See the CloudCannon [Docs](https://cloudcannon.com/documentation/articles/configure-your-rich-text-editors/) for more information.

#### Variables

Variables can be updated/added within `/src/assets/styles/_variables.scss`

### Blog with pagination & tags

A blog section with tags and pagination is included.

Documentation, blog and other text heavy sections should replicate how the blog section is implemented in this template.

The blog pages in this template allow for snippets and have some preconfigured options. Snippets allow you to use HTML components throughout your markdown text.

A common layout, with changing markdown content is favored for these kinds of text heavy pages, rather than using editable-region components - which are defined and managed in your markdown pages frontmatter.

These text heavy pages will be edited in CloudCannon's content editor, rather than the visual editor used for building pages with editable-region components.

#### Drafts

Drafts (content that exsits but is unpublished and not included within collections) are supported within the site. If you want to have drafts enabled, on your main site within CloudCannon you will need to set the variable `ELEVENTY_ENV=production` and remove

```
drafts:
  hidden: true
```

in the cloudcannon.config.yml file.

### Data files

Demonstrates using data files to:

- Populate select inputs in CloudCannon. This is powerful for allowing editors to make styling changes to the page, within a set design system populated by an editable data file. This is done with the icons and colors data files.
- Set sitewide values such as the overall site SEO settings.
- Control header and footer data to allow editors control over navigation.

### Image Optimization

[11ty Image](https://www.11ty.dev/docs/plugins/image/) is used in the two placeholder components in this template, it has been created as a subcomponent in `/src/_includes/components/image.liquid`.
The image component will process an image in your src/assets/images folder, and output an optimized image, like below:

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /optimized/0L8bYGwHxv-640.avif   640w,
      /optimized/0L8bYGwHxv-960.avif   960w,
      /optimized/0L8bYGwHxv-1280.avif 1280w
    "
    sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px" />
  <source
    type="image/webp"
    srcset="
      /optimized/0L8bYGwHxv-640.webp   640w,
      /optimized/0L8bYGwHxv-960.webp   960w,
      /optimized/0L8bYGwHxv-1280.webp 1280w
    "
    sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px" />
  <img
    alt="An image"
    class="c-image"
    loading="eager"
    decoding="async"
    src="/optimized/0L8bYGwHxv-640.jpeg"
    width="1280"
    height="701"
    srcset="
      /optimized/0L8bYGwHxv-640.jpeg   640w,
      /optimized/0L8bYGwHxv-960.jpeg   960w,
      /optimized/0L8bYGwHxv-1280.jpeg 1280w
    "
    sizes="(max-width: 640px) 320px, (max-width: 960px) 500px, (max-width: 1280px) 640px" />
</picture>
```

### Optimised for editing in CloudCannon

#### Cloudcannon Configuration

The placeholder components show how to configure your components to control inputs and previews in CloudCannon.

A `cloudcannon.config.yml` file has been provided with some configuration that starts to show what can be done to configure the CMS.

This template also demonstrates how to set [`uploads` paths](https://cloudcannon.com/documentation/articles/adjusting-the-uploads-path/) on an input level, to allow for different asset types to go to different folders.

#### Schemas

Shows how to set up schemas in CloudCannon to allow for non-technical editors to create new pages, with preset frontmatter and content.
Schemas can be defined on a collection level, allowing your new blog pages to be different to your new landing pages.
This allows for your text heavy blog/docs pages to be built and edited in the content editor, while your other pages can be built with editable regions in the visual editor.

### SEO controls

SEO inputs come set up and configured to allow editors to control SEO on a page-by-page, and sitewide basis.

- Favicon and site SEO details are set in the Data / Site section
- SEO details can also be set in pages for page specific details.

### Font Awesome Icons

A Font Awesome Icon free icon pack is included, without having to set up your own kit in Font Awesome.

To add more icons:

1. Go to the [Font Awesome icon list](https://fontawesome.com/search?o=r&m=free)
2. Pick a free icon
3. Add a new entry to the icons file in the data collection, `src/_data/icons.json`. This file populates the icon dropdown list used for icons in the placeholder components. Add a name, and the class that FA gives you, eg. `fa-solid fa-bookmark`.

If you want to add a custom icon, follow the example of the CloudCannon icon used in this template.

#### Remove Font Awesome Icons

1. Remove the following packages from your `package.json`:

```json
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.6.0",
  }
```

2. Remove `/src/_includes/components/icon.liquid`

3. Remove any references to the icon component from other components

4. Remove `/src/_data/icons.json`

5. Remove any select inputs that were using the icon

```yaml
icon:
  type: select
  options:
    values: data.icons
```

6. Remove icons from your defined data in `cloudcannon.config.yml`

```yaml
data_config:
  icons:
    path: src/_data/icons.json
```
