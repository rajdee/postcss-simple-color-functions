# PostCSS Simple Color Functions [![Build Status][ci-img]][ci]

[PostCSS] plugin for manipulating color transformations.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/rajdee/postcss-simple-color-functions.svg
[ci]:      https://travis-ci.org/rajdee/postcss-simple-color-functions

```css
.foo {
    color: colors(#23bc98 darken(0.5);
    background-color: colors(#23bc98 brighten(1.2);
}
```

```css
.foo {
    color: #00a381;
    background-color: #71fad3;
}
```

```css
.foo {
    color: colors(#23bc98 rgb);
}
```

```css
.foo {
    color: rgb(35,188,152);
}
```

```css
.foo {
    color: colors(#23bc98 brightness(20%));
    background-color: colors(#23bc98 brightness(-20%));
}
```

```css
.foo {
    color: #58e3bd;
    background-color: #009675;
}
```

## Installation

Add [PostCSS Simple Color Functions] to your build tool.
```sh
npm install postcss postcss-simple-color-functions --save-dev
```
or
```sh
yarn add postcss postcss-simple-color-functions --dev
```

## Usage

```js
postcss([ require('postcss-simple-color-functions') ])
```

See [PostCSS] docs for examples for your environment.
