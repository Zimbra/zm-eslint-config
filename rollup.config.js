const buble = require('@rollup/plugin-buble');

module.exports = {
  plugins: [buble({ objectAssign: 'Object.assign' })]
};
