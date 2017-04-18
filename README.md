# web-chalk

Print beautiful words on the console
![web-chalk](https://wangzongxu.github.io/img-cache/webchalk/webchalk.png)
## Installing

```bash
$ npm install web-chalk --save
```

## Usage

### ready

- AMD
```js
var webChalk = require('web-chalk');
```
- inline
```html
<script src='./web-chalk.min.js' type="text/javascript"></script>
```

### go

1. make a pattern of strings
```js
var str = "\
    ██\n\
    ██\n\
    ██   ██████   ██       ████████   ████████   ██     ██\n\
    ██            ██       ███           ██       ██   ██\n\
    ████████      ██       ████████      ██        ██ ██\n\
                  ██       ███           ██         ███\n\
         ██████   ██████   ████████      ██   ^_^    █"
```

2. add color
```js
var str_ = "\
    <b>██</b>\n\
    <b>██</b>\n\
    <b>██</b>   <g>██████</g>   ██       ████████   ████████   ██     ██\n\
    <b>██</b>            ██       ███           ██       ██   ██\n\
    <bl>██</bl><gr>██████</gr>      ██       ████████      ██        ██ ██\n\
    ██       ███           ██         ███\n\
    <r>██████</r>   ██████   ████████      ██   <b>^_^</b>    █"
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
//params:(target[string], cssClass[Object] ,(?defaultCss[defaultCss list]))
webChalk(str, cssClass, defaultCss);
```

> If your entire string style is the same,You can omit the cssClass parameter

```js
webChalk(str, defaultCss);
```
## License:
MIT
