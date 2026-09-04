import { describe, it } from 'node:test';
import { RuleTester } from 'eslint';
import globals from 'globals';

import rule from '../src/rules/custom-rules/no-unsafe-window-open.js';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
			...globals.browser,
			...globals.node
		}
	}
});

const error = [{ messageId: 'requireNoopener' }];

ruleTester.run('no-unsafe-window-open', rule, {
	valid: [
		// Safe feature strings
		"window.open(url, '_blank', 'noopener')",
		"window.open(url, '_blank', 'noopener,noreferrer')",
		"window.open(url, '_blank', 'NOOPENER')",
		"window.open(url, '_blank', ' noopener , noreferrer ')",
		// 'noreferrer' implies 'noopener'
		"window.open(url, '_blank', 'noreferrer')",
		// Features tokenize on '=' and whitespace, not just ','
		"window.open(url, '_blank', 'width=500,height=400,noopener=yes')",
		"window.open(url, '_blank', 'noopener noreferrer')",
		"window.open(url, '_blank', 'noopener=1')",
		"window.open(url, '_blank', 'noopener=true')",
		"window.open(url, '_blank', 'width=500 noopener')",
		// Template literals with no substitutions are read like plain strings
		'window.open(url, `_blank`, `noopener`)',

		// Targets that reuse the current browsing context
		"window.open(url, '_self')",
		"window.open(url, '_parent')",
		"window.open(url, '_top')",
		"window.open(url, '_SELF')",

		// Named targets are opt-in
		"window.open(url, 'myWindow')",

		// Dynamic values are skipped to avoid false positives
		'window.open(url, target)',
		'window.open(url, `_${suffix}`)',
		"window.open(url, '_blank', features)",
		'window.open(url, "_blank", `w=${width},noopener`)',

		// `open` that is not the DOM global
		'const open = () => {}; open();',
		"import open from 'open'; open('http://example.com');",
		'function f({ open }) { open(); }',
		'function f(open) { open(url, "_blank"); }',
		'obj.open(url, "_blank")',
		'fs.open(path, flags)',
		// A shadowed window is not the global
		'function f(window) { window.open(url, "_blank"); }',
		// `var self = this` is a common alias and not a window
		'const self = this; self.open(url, "_blank");'
	],

	invalid: [
		// Missing features argument
		{ code: "window.open(url, '_blank')", errors: error },
		{ code: 'window.open(url)', errors: error },
		{ code: 'window.open()', errors: error },
		{ code: "window.open(url, '_BLANK')", errors: error },
		// An empty target becomes '_blank'
		{ code: "window.open(url, '')", errors: error },
		// Features present but without noopener
		{ code: "window.open(url, '_blank', '')", errors: error },
		{ code: "window.open(url, '_blank', 'width=500,height=400')", errors: error },
		{ code: "window.open(url, '_blank', 'noreferrer=no')", errors: error },
		// 'noopener' explicitly disabled
		{ code: "window.open(url, '_blank', 'noopener=no')", errors: error },
		{ code: "window.open(url, '_blank', 'noopener=0')", errors: error },
		{ code: "window.open(url, '_blank', 'noopener=false')", errors: error },
		{ code: "window.open(url, '_blank', 'width=500,noopener=no')", errors: error },
		// Template literals with no substitutions
		{ code: 'window.open(url, `_blank`)', errors: error },
		{ code: 'window.open(url, `_blank`, `width=500`)', errors: error },
		// Other ways of reaching the global
		{ code: "globalThis.open(url, '_blank')", errors: error },
		{ code: "self.open(url, '_blank')", errors: error },
		{ code: "top.open(url, '_blank')", errors: error },
		{ code: "parent.open(url, '_blank')", errors: error },
		{ code: "window.top.open(url, '_blank')", errors: error },
		{ code: "globalThis.window.open(url, '_blank')", errors: error },
		{ code: "window?.open(url, '_blank')", errors: error },
		// Bare global `open`
		{ code: "open(url, '_blank')", errors: error },
		{ code: 'open(url)', errors: error },

		// includeNamedTargets extends the rule to any new browsing context
		{
			code: "window.open(url, 'myWindow')",
			options: [{ includeNamedTargets: true }],
			errors: error
		},
		{
			code: "window.open(url, 'myWindow', 'width=500')",
			options: [{ includeNamedTargets: true }],
			errors: error
		},
		{
			code: "window.open(url, ' _blank')",
			options: [{ includeNamedTargets: true }],
			errors: error
		}
	]
});
