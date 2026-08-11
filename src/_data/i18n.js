const {
	DEFAULT_LOCALE,
	LOCALES,
	LOCALE_CODES,
	TRANSLATED_CODES,
} = require("../../_11ty_config/locales");

// Template-visible view of _11ty_config/locales.js.
module.exports = {
	default_locale: DEFAULT_LOCALE,
	codes: LOCALE_CODES,
	translated_codes: TRANSLATED_CODES,
	options: LOCALE_CODES.map((code) => ({ code, label: LOCALES[code].label })),
};
