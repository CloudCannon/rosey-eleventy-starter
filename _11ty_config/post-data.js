const { LOCALES, localePrefix } = require("./locales");

const isDevEnv = (process.env.ELEVENTY_ENV || "development") !== "production";

function showDraft(data) {
	return isDevEnv || data.draft !== true;
}

// Shared directory data for every blog tree.
module.exports = function postData(code) {
	const prefix = localePrefix(code);

	return {
		layout: "layouts/post.html",
		locale: code,
		posts_collection: LOCALES[code].collection,
		// Own translated frontmatter — a Rosey head key would overwrite it.
		rosey_seo: false,
		hide_locale_switcher: true,
		eleventyComputed: {
			eleventyExcludeFromCollections: (data) =>
				showDraft(data) ? data.eleventyExcludeFromCollections : true,
			permalink: (data) => {
				if (!showDraft(data)) return false;
				if (data.permalink) return data.permalink;
				// fileSlug, not `title | slugify`: every locale's copy shares the
				// English slug, or locale and tag links point at URLs that don't exist.
				return `${prefix}/blog/${data.page.fileSlug}/`;
			},
		},
	};
};
