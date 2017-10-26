# web-chalk

Print beautiful words on the console.
[demo](https://wangzongxu.github.io/web-chalk/)
![web-chalk](https://wangzongxu.github.io/img-cache/webchalk/webchalk.png)
## Installing

```bash
$ npm install web-chalk --save
```

## Usage

### ready

- require
```js
var webChalk = require('web-chalk');
```

- or
```html
<script src='./web-chalk.min.js' type="text/javascript"></script>
```

### go

1. make a pattern of strings
```js
var str = "\n\
        ██          ███████         ███████\n\
      ██  ██        ██     ██     ██\n\
     ██ ▄▄ ██       ███████       ██\n\
    ██      ██      ██     ██     ██\n\
   ██        ██     ███████         ███████   A  B  C\n\
    "
```

2. add color
```js
var str_ = "\n\
        <b>██</b>          <r>███████</r>         <g>███████</g>\n\
      <b>██  ██</b>        <r>██     ██</r>     <g>██</g>\n\
     <b>██ ▄▄ ██</b>       <r>███████</r>       <g>██</g>\n\
    <b>██      ██</b>      <r>██     ██</r>     <g>██</g>\n\
   <b>██        ██</b>     <r>███████</r>         <g>███████</g>  <b>A</b> <r>B</r> <g>C</g>\n\
    "
```

3. define the class name in a css Object, the string wrapped by the class name tag will have the color of the corresponding class name
```js
var cssClass = {
    b: {
        color: 'rgb(29,174,229)'
    },
    bl: {
        color: 'rgb(67,81,84)'
    },
    r: {
        color: 'rgb(218,14,26)'
    },
    g: {
        color: 'rgb(171,204,3)'
    },
    gr: {
        color: 'rgb(92,104,104)'
    }
}
```

4. a string that is not wrapped by a tag will use the default style, and you can also customize the default style
```js
var defaultCss = {
  color:'gray'
}
```

5. output
```js
// params:(target[string], config[object])
// config: {style[object], default[object]?}
webChalk(str, {
    style: cssClass,
    default: defaultCss
});
```

> If your entire string style is the same,You can omit the style parameter

```js
webChalk(str,  {
    default: defaultCss
});
```

#### others methods

- webChalk.log('abc')
- webChalk.warn('abc')
- webChalk.error('abc')
- webChalk.info('abc')

## License:
MIT
