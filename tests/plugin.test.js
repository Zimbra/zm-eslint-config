import { test } from 'node:test';
import assert from 'node:assert/strict';
import plugin from '../src/plugin/index.js';
import customConfig from '../src/configs/custom-config.js';

test('plugin exposes the expected rules with valid shape', () => {
	const expected = ['no-direct-memoize', 'no-unsafe-window-open', 'require-icon-import-suffix'];

	assert.deepEqual(Object.keys(plugin.rules).sort(), [...expected].sort());

	for (const [name, rule] of Object.entries(plugin.rules)) {
		assert.equal(typeof rule.create, 'function', `${name} must define create()`);
		assert.ok(rule.meta && rule.meta.docs, `${name} must define meta.docs`);
	}
});

test('custom-config registers the plugin and enables every rule', () => {
	assert.equal(customConfig.plugins.custom, plugin);

	for (const name of Object.keys(plugin.rules)) {
		assert.ok(
			customConfig.rules[`custom/${name}`],
			`custom/${name} must be enabled in custom-config`
		);
	}
});
