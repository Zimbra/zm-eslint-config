module.exports = translations => {
	return Object.keys(translations).sort((keyA, keyB) => {
		return keyA.localeCompare(keyB, undefined, {
			numeric: true,
			sensitivity: 'base'
		});
	});
};
