import path from 'path';
import { fileURLToPath } from 'url';

const configUrl = import.meta.url;
const intlPath = process.env.ESLINT_INTL_PATH ?? 'src/intl';
const PRIMARY_LANGUAGE = 'en_US.json';
const __filename = fileURLToPath(configUrl);
const __dirname = path.dirname(__filename);
const CUSTOM_SORT_PATH = path.join(__dirname, '../../scripts/intl/lint-custom-sort.cjs');

// i18n-json rules
export const i18nJsonRules = {
	'i18n-json/sorted-keys': [
		'error',
		{
			sortFunctionPath: CUSTOM_SORT_PATH
		}
	],
	'i18n-json/identical-keys': [
		'error',
		{
			filePath: path.resolve(path.join(intlPath, PRIMARY_LANGUAGE))
		}
	]
};

// Preact i18n rules
export const i18nRules = {
	'preact-i18n/no-missing-template-field': 'error',
	'preact-i18n/no-text-as-attribute': 'error',
	'preact-i18n/no-text-as-children': [
		'error',
		{ ignoreTextRegex: '^(?:\\s*[()🚩.":<>\\-/]\\s*)*$' }
	],
	'preact-i18n/no-unknown-key': 'error'
};

export const LANGUAGE_FILES_RELATIVE = [
	{
		name: 'ar',
		filename: 'ar.json'
	},
	{
		name: 'bg',
		filename: 'bg.json'
	},
	{
		name: 'ca',
		filename: 'ca.json'
	},
	{
		name: 'cs',
		filename: 'cs.json'
	},
	{
		name: 'da',
		filename: 'da.json'
	},
	{
		name: 'de',
		filename: 'de.json'
	},
	{
		name: 'en_US',
		filename: 'en_US.json'
	},
	{
		name: 'es',
		filename: 'es.json'
	},
	{
		name: 'eu',
		filename: 'eu.json'
	},
	{
		name: 'fr_FR',
		filename: 'fr_FR.json'
	},
	{
		name: 'fr_CA',
		filename: 'fr_CA.json'
	},
	{
		name: 'hi',
		filename: 'hi.json'
	},
	{
		name: 'hr',
		filename: 'hr.json'
	},
	{
		name: 'hu',
		filename: 'hu.json'
	},
	{
		name: 'id',
		filename: 'id.json'
	},
	{
		name: 'it',
		filename: 'it.json'
	},
	{
		name: 'ja',
		filename: 'ja.json'
	},
	{
		name: 'ko',
		filename: 'ko.json'
	},
	{
		name: 'lo',
		filename: 'lo.json'
	},
	{
		name: 'ms',
		filename: 'ms.json'
	},
	{
		name: 'nl',
		filename: 'nl.json'
	},
	{
		name: 'nn_NO',
		filename: 'nn_NO.json'
	},
	{
		name: 'pl',
		filename: 'pl.json'
	},
	{
		name: 'pt_BR',
		filename: 'pt_BR.json'
	},
	{
		name: 'pt',
		filename: 'pt.json'
	},
	{
		name: 'ro',
		filename: 'ro.json'
	},
	{
		name: 'ru',
		filename: 'ru.json'
	},
	{
		name: 'sk',
		filename: 'sk.json'
	},
	{
		name: 'sl',
		filename: 'sl.json'
	},
	{
		name: 'sv',
		filename: 'sv.json'
	},
	{
		name: 'ta',
		filename: 'ta.json'
	},
	{
		name: 'th',
		filename: 'th.json'
	},
	{
		name: 'tr',
		filename: 'tr.json'
	},
	{
		name: 'uk',
		filename: 'uk.json'
	},
	{
		name: 'vi',
		filename: 'vi.json'
	},
	{
		name: 'zh_CN',
		filename: 'zh_CN.json'
	},
	{
		name: 'zh_HK',
		filename: 'zh_HK.json'
	},
	{
		name: 'zh_TW',
		filename: 'zh_TW.json'
	}
];

// Global settings for text component recognition
export const i18nTextComponents = [
	{ nameRegex: '^Text$' },
	{ nameRegex: '^TextInput$', id: 'placeholderId' },
	{ nameRegex: '^AlignedLabel$', id: 'textId' },
	{ nameRegex: '^(?:Inline)?Modal(?:Dialog|Drawer)', id: 'title' },
	{ nameRegex: '^ContactSuggestion$', id: 'previouslySelectedLabel' }
];
