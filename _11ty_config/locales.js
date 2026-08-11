// Single source of truth for the site's languages. Adding one also needs a
// src/pages/blog_<code>/ directory and CloudCannon config — see the README.

const DEFAULT_LOCALE = "en";

const LOCALES = {
	en: { label: "EN", dateLocale: "en-US", postsDir: "blog", collection: "posts" },
	fr: { label: "FR", dateLocale: "fr-FR", postsDir: "blog_fr", collection: "posts_fr" },
	de: { label: "DE", dateLocale: "de-DE", postsDir: "blog_de", collection: "posts_de" },
};

const LOCALE_CODES = Object.keys(LOCALES);
const TRANSLATED_CODES = LOCALE_CODES.filter((code) => code !== DEFAULT_LOCALE);

// Only non-default locales get a prefix here. `rosey build` relocates the
// default language from / to /en/; emitting /en/ ourselves would give /en/en/.
function localePrefix(code) {
	return code === DEFAULT_LOCALE ? "" : `/${code}`;
}

module.exports = {
	DEFAULT_LOCALE,
	LOCALES,
	LOCALE_CODES,
	TRANSLATED_CODES,
	localePrefix,
};
