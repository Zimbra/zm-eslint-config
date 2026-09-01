import { test } from 'node:test';
import { RuleTester } from 'eslint';
import rule from '../src/plugin/rules/require-icon-import-suffix.js';

const ruleTester = new RuleTester({
	languageOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	}
});

test('require-icon-import-suffix', () => {
	ruleTester.run('require-icon-import-suffix', rule, {
		valid: [
			// lucide-preact exposes Icon-suffixed exports; use them directly.
			"import { ChartPieIcon } from 'lucide-preact';",
			"import { ChartPieIcon, ArrowRightIcon } from 'lucide-preact';",
			// Custom icon modules are aliased to carry the suffix locally.
			"import { pdf as pdfIcon } from '@zimbra/lucide-lab';",
			// Non-icon modules are untouched.
			"import { useState } from 'preact/hooks';",
			"import ChartPie from 'some-other-lib';",
			// Custom module list via options.
			{
				code: "import { star as starIcon } from '@acme/icons';",
				options: [{ modules: ['@acme/icons'] }]
			},
			// A module NOT in the configured list is ignored even if unsuffixed.
			{
				code: "import { ChartPie } from 'lucide-preact';",
				options: [{ modules: ['@zimbra/lucide-lab'] }]
			},
			// Custom suffix via options.
			{
				code: "import { pdf as pdfSvg } from '@zimbra/lucide-lab';",
				options: [{ suffix: 'Svg' }]
			}
		],
		invalid: [
			{
				// lucide-preact without the suffix.
				code: "import { ChartPie } from 'lucide-preact';",
				errors: [{ messageId: 'missingSuffix' }]
			},
			{
				// custom module without an alias.
				code: "import { pdf } from '@zimbra/lucide-lab';",
				errors: [{ messageId: 'missingSuffix' }]
			},
			{
				// alias to a non-suffixed local name still fails (local name is what matters).
				code: "import { ChartPieIcon as ChartPie } from 'lucide-preact';",
				errors: [{ messageId: 'missingSuffix' }]
			},
			{
				// each bad specifier reports independently.
				code: "import { ChartPie, ArrowRightIcon, Star } from 'lucide-preact';",
				errors: [{ messageId: 'missingSuffix' }, { messageId: 'missingSuffix' }]
			},
			{
				code: "import * as Icons from 'lucide-preact';",
				errors: [{ messageId: 'noNamespace' }]
			},
			{
				code: "import Lucide from 'lucide-preact';",
				errors: [{ messageId: 'noDefault' }]
			}
		]
	});
});
