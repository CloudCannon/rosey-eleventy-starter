const pluginEditableRegions = require("@cloudcannon/editable-regions/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const MarkdownIt = require("markdown-it");

/* 11ty config imports */
const image_shortcode = require("./_11ty_config/image_shortcode");
const {
	DEFAULT_LOCALE,
	LOCALES,
	LOCALE_CODES,
	localePrefix,
} = require("./_11ty_config/locales");

const md = new MarkdownIt({ html: true });

const PAGE_SIZE = 3;

// Rosey matches whole strings per key, so "Seo" in one place and "SEO" in
// another is a permanently stale translation.
const TAG_LABEL_OVERRIDES = { seo: "SEO", cms: "CMS", rss: "RSS" };

module.exports = async function (eleventyConfig) {
	const { RenderPlugin } = await import("@11ty/eleventy");

	eleventyConfig.addPassthroughCopy("src/assets/images");
	eleventyConfig.addPassthroughCopy("src/assets/videos");
	eleventyConfig.addPassthroughCopy("src/assets/documents");
	eleventyConfig.addPassthroughCopy(
		"node_modules/@fortawesome/fontawesome-free/css/all.min.css",
	);
	eleventyConfig.addPassthroughCopy(
		"node_modules/@fortawesome/fontawesome-free/webfonts",
	);
	eleventyConfig.addPassthroughCopy("node_modules/@11ty/eleventy");

	eleventyConfig.addWatchTarget("src/assets/styles/**/*.{css,scss}");
	eleventyConfig.addWatchTarget("src/_includes/components/");

	// `@11ty/eleventy-img` is Node/sharp-only, so stub it out of the browser
	// live-editing bundle.
	eleventyConfig.addPlugin(pluginEditableRegions, {
		liquid: { browserStub: ["@11ty/eleventy-img"] },
	});

	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(RenderPlugin);

	// Not named `renderContent`: that's a reserved built-in in the
	// editable-regions Liquid runtime, and a same-named custom filter is skipped.
	eleventyConfig.addLiquidFilter("renderMarkdown", (value) =>
		value ? md.render(value) : "",
	);

	// Custom Shortcodes
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
	eleventyConfig.addShortcode("image", image_shortcode);
	eleventyConfig.addPairedLiquidShortcode(
		"tint",
		function (content, tint_color) {
			return `<span style="color: ${tint_color}">${content}</span>`;
		},
	);

	// Snippet shortcodes
	eleventyConfig.addLiquidShortcode(
		"alert",
		function (background_color, alert_message, color, icon) {
			const iconHtml = icon
				? `<span class="icon"><i class="${icon}"></i></span>`
				: "";
			// Plain classes, styled in _components.scss: Tailwind only scans the
			// template globs in tailwind.css, so utilities written here never generate.
			return `<div class="s-alert" style="background-color: ${background_color}; color: ${color};">
  <p class="s-alert__message">${iconHtml}${alert_message}</p>
</div>`;
		},
	);
	eleventyConfig.addLiquidShortcode("video", function (src) {
		return `<video class="s-video" controls>
  <source src="${src}" type="video/mp4" />
  Your browser does not support the video tag.
</video>`;
	});
	eleventyConfig.addLiquidShortcode(
		"file",
		function (src, file_name, link_message) {
			return `<a href="${src}" download="${file_name}">${link_message}</a>`;
		},
	);

	eleventyConfig.addLiquidFilter("tagLabel", function (tag) {
		if (!tag) return "";
		const slug = String(tag).toLowerCase();
		return (
			TAG_LABEL_OVERRIDES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1)
		);
	});

	eleventyConfig.addLiquidFilter("localDate", function (date, locale) {
		const config = LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
		return new Intl.DateTimeFormat(config.dateLocale, {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(date));
	});

	// Rosey rewrites links on the pages it generates but leaves pre-existing
	// locale pages alone, so those have to prefix their own.
	eleventyConfig.addLiquidFilter("localizeUrl", function (url, locale) {
		if (!url || !locale || locale === DEFAULT_LOCALE) return url;
		if (!url.startsWith("/") || url.startsWith("//")) return url;
		// Extensioned paths (/feed.xml) are emitted once at the root, so a prefix
		// points at nothing.
		if (/\.[a-z0-9]+$/i.test(url)) return url;
		return `/${locale}${url}`;
	});

	// Custom Collections
	const byDateDesc = (a, b) => b.date - a.date;
	const postsFor = (collectionApi, code) =>
		collectionApi
			.getFilteredByGlob(`src/pages/${LOCALES[code].postsDir}/**/*.md`)
			.sort(byDateDesc);

	for (const code of LOCALE_CODES) {
		eleventyConfig.addCollection(LOCALES[code].collection, (collectionApi) =>
			postsFor(collectionApi, code),
		);
	}

	// Rosey copies HTML without re-running templates, so pages that list posts
	// are built once per locale or they keep the default language's titles.
	eleventyConfig.addCollection("localeHomes", () =>
		LOCALE_CODES.map((code) => ({
			locale: code,
			url: `${localePrefix(code)}/`,
			posts_collection: LOCALES[code].collection,
		})),
	);

	// One entry per output page of the blog index, across every locale, so a
	// single blog.md serves them all and its shared strings get one Rosey key.
	eleventyConfig.addCollection("blogListingPages", function (collectionApi) {
		const pages = [];
		for (const code of LOCALE_CODES) {
			const posts = postsFor(collectionApi, code);
			const total = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
			const urlFor = (i) =>
				`${localePrefix(code)}/blog${i > 0 ? `/${i}` : ""}/`;
			const hrefs = Array.from({ length: total }, (_, i) => urlFor(i));

			for (let i = 0; i < total; i++) {
				pages.push({
					locale: code,
					pageNumber: i,
					url: urlFor(i),
					hrefs,
					previous: i > 0 ? urlFor(i - 1) : null,
					next: i < total - 1 ? urlFor(i + 1) : null,
					posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
				});
			}
		}
		return pages;
	});

	// Eleventy's frontmatter tag collections are global, so a `collections.seo`
	// lookup would mix languages onto one tag page.
	eleventyConfig.addCollection("tagPages", function (collectionApi) {
		const pages = [];
		for (const code of LOCALE_CODES) {
			const byTag = new Map();
			for (const post of postsFor(collectionApi, code)) {
				for (const tag of post.data.tags || []) {
					const slug = String(tag).toLowerCase();
					if (!byTag.has(slug)) byTag.set(slug, []);
					byTag.get(slug).push(post);
				}
			}
			for (const [tag, posts] of byTag) {
				pages.push({
					locale: code,
					tag,
					posts,
					url: `${localePrefix(code)}/blog/tags/${tag}/`,
				});
			}
		}
		return pages;
	});

	return {
		dir: {
			input: "src",
			output: "_site",
		},
	};
};
