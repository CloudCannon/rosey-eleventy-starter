const { LOCALE_CODES } = require("../../_11ty_config/locales");

// blog_fr/my-post -> blog/my-post, so locale pages share their English keys.
const localeDirRe = new RegExp(`^([^/]+)_(${LOCALE_CODES.join("|")})(/|$)`);

module.exports = {
	// filePathStem, not page.url: it ignores the computed permalink and is
	// identical across pagination pages, so /blog/ and /blog/1/ share one root.
	rosey_root: (data) => {
		if (data.rosey_root_override) return data.rosey_root_override;

		const stem = (data.page && data.page.filePathStem) || "";
		const key = stem
			.replace(/^\/pages\//, "")
			.replace(/^\/+/, "")
			.replace(localeDirRe, "$1$3");

		return key === "" || key === "index" ? "index" : key;
	},
};
