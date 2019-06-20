const postcss = require('postcss');
const parser = require('postcss-value-parser');
const colorFunctions = require('simple-color-functions');

const supportedMethods = [
    'alpha',
    'darken',
    'brighten',
    'brightness',
    'luminance',
    'contrast'
];

module.exports = postcss.plugin('postcss-simple-color-functions', function(
    opts
) {
    opts = opts || {};

    // Work with options here

    return function(root, result) {
        root.walkDecls(decl => {
            if (!decl.value || !decl.value.includes('colors(')) {
                return;
            }
            const parsedValues = parser(decl.value);
            const nodes = parsedValues.nodes[0].nodes.filter(
                value => value.type !== 'space'
            );
            const [ color, ...methods ] = nodes;

            if (color.type !== 'word') {
                throw decl.error(
                    'The first param of colors should contain the color value!'
                );
            }

            const mode = methods[methods.length - 1].value === 'rgb' ? 'css' : 'hex';

            const functions = methods.filter(
                f => f.type === 'function' && supportedMethods.includes(f.value)
            );
            const colorTransformation = functions.reduce((acc, current) => {
                const method = current.value;
                const value =
                    'nodes' in current && current.nodes.length
                        ? current.nodes[0].value
                        : undefined;
                acc = acc[method].call(acc, value);
                return acc;
            }, new colorFunctions(color.value));

            decl.value = colorTransformation[mode].call(colorTransformation);
        });
    };
});
