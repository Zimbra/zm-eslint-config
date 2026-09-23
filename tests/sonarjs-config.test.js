import assert from 'node:assert/strict';
import test from 'node:test';

import sonarjsConfig from '../src/configs/sonarjs-config.js';

test('sonarjs config keeps SonarJS rules enabled and disables overlapping core rules', () => {
	assert.ok(sonarjsConfig.plugins && sonarjsConfig.plugins.sonarjs);
	assert.equal(sonarjsConfig.rules['sonarjs/no-identical-expressions'], 'error');
	assert.equal(sonarjsConfig.rules['sonarjs/no-fallthrough'], 'error');
	assert.equal(sonarjsConfig.rules['no-unused-vars'], undefined);
	assert.equal(sonarjsConfig.rules['no-fallthrough'], 'off');
	assert.equal(sonarjsConfig.rules['no-eval'], 'off');
	assert.equal(sonarjsConfig.rules['no-implied-eval'], 'off');
	assert.equal(sonarjsConfig.rules['no-new-func'], 'off');
});

test('sonarjs config keeps recommended SonarJS rules enabled', () => {
	assert.equal(sonarjsConfig.rules['sonarjs/no-identical-expressions'], 'error');
	assert.equal(sonarjsConfig.rules['sonarjs/no-fallthrough'], 'error');
	assert.equal(sonarjsConfig.rules['sonarjs/cognitive-complexity'], 'error');
});
