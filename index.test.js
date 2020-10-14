const postcss = require('postcss');

const plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ])
        .process(input, { from: undefined })
        .then(function(result) {
            expect(result.css).toEqual(output);
            expect(result.warnings()).toHaveLength(0);
        });
}

it('should return darken color with default amount', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 darken());} a { background: #bbb; }',
        '.test{ background: #bbb; color: #008b6a;} a { background: #bbb; }',
        {}
    );
});

it('should return darken color with custom amount', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 darken(0.5));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #00a381;} a { background: #bbb; }',
        { }
    );
});

it('should return brighten color with default amount', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brighten());} a { background: #bbb; }',
        '.test{ background: #bbb; color: #66efc9;} a { background: #bbb; }',
        { }
    );
});

it('should return brighten color with custom amount', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brighten(1.2));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #71fad3;} a { background: #bbb; }',
        { }
    );
});

it('should return converted color from hex to rgb', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 rgb);} a { background: #bbb; }',
        '.test{ background: #bbb; color: rgb(35,188,152);} a { background: #bbb; }',
        { }
    );
});

it('should return converted color with alpha chanel', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 alpha(.5) rgb);} a { background: #bbb; }',
        '.test{ background: #bbb; color: rgba(35,188,152,.5);} a { background: #bbb; }',
        { }
    );
});

it('should return brighten color by brightness in percent', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brightness(20%));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #58e3bd;} a { background: #bbb; }',
        { }
    );
});

it('should return darken color by brightness in percent', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brightness(-20%));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #009675;} a { background: #bbb; }',
        { }
    );
});

it('should return brighten color by brightness', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brightness(0.2));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #58e3bd;} a { background: #bbb; }',
        { }
    );
});

it('should return darken color by brightness', () => {
    return run(
        '.test{ background: #bbb; color: colors(#23bc98 brightness(-0.2));} a { background: #bbb; }',
        '.test{ background: #bbb; color: #009675;} a { background: #bbb; }',
        { }
    );
});


// it('should return contrast criteria of two colors', () => {
//     return run(
//         '.test{ background: #bbb; color: contrast(#fff #23bc98);} a { background: #bbb; }',
//         '.test{ background: #bbb; color: 2.3348071108457673;} a { background: #bbb; }',
//         { }
//     );
// });
