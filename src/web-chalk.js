;
(function(name, factory) {
    if (typeof define !== 'undefined') {
        define(factory)
    } else if (typeof module == 'object' && module.exports) {
        module.exports = factory()
    } else {
        this[name] = factory()
    }
})('webChalk', function() {
    // define some regexp
    var tagRe = /<(\/?[a-zA-Z]+?)>/g;
    var openTagRe = /</;
    var closeTagRe = /\/([a-zA-Z]+?)>([\s\S]*)/;
    var classTagRe = /^([a-zA-Z]+?)>([\s\S]*)/;
    var humpNameRe = /([a-z])([A-Z])/
    // isIE
    var isIe = /MSIE|TRIDENT/i.test(navigator.userAgent);

    function WebChalk$1(template, config) {
        if (!config) {
          console.log(template);
          return
        }
        if (Object.prototype.toString.call(config) !== '[object Object]') {
            throw new Error('The second argument must be a object')
        }
        if(isIe){
          template = template.replace(tagRe,'');
          console.log(template);
          return;
        }
        this.str = template + '';
        this.css = config.style || {};
        this.result = '';
        this.logArr = [];
        this.dafaultCss = this.formatCss(config.default);
        this.init();
    }
    WebChalk$1.prototype = {
        init: function() {
            this.css = this.handleCss(this.css);
            this.handleTpl();
            this.output();
        },
        output: function() {
            this.logArr.unshift(this.result);
            console.log.apply(null, this.logArr)
        },
        formatCss: function(cssObj) {
            cssObj = cssObj || {};
            var str = '';
            var that = this;
            that.each(cssObj, function(key, val) {
                str += that.formatHumpName(key) + ':' + val + ';'
            })
            return str
        },
        handleCss: function(cssObj) { //处理样式
            var that = this;
            var result = {};
            that.each(cssObj, function(key, val) {
                result[key] = that.formatCss(val);
            });
            return result
        },
        handleTpl: function() { //处理模板
            var that = this;
            var arr = that.str.split(openTagRe);
            if(arr.length === 1){ // 没有标签
              console.log('%c' + that.str, that.dafaultCss);
              return
            }
            var openClassAll = []; // 所有的开标签
            var closeCloseAll = []; // 所有的闭标签
            that.each(arr,function(item) {
                var openClass = item.match(classTagRe);
                var closeClose = item.match(closeTagRe);
                var className = '';
                var content;
                if (openClass) {
                    className = openClass[1];
                    openClassAll.push(className);
                    content = openClass[2]; // 没有内容就是 ''
                    that.result += '%c' + content;
                    that.logArr.push(that.css[className] || that.dafaultCss);// 没定义class按默认
                } else if (closeClose) {
                    className = closeClose[1];
                    closeCloseAll.push(className || that.dafaultCss);
                    content = closeClose[2]; // 没有内容就是 ''
                    that.result += '%c' + content;
                    if (content != '') {
                        var nearClass = that.findClass(openClassAll, closeCloseAll);
                        that.logArr.push(that.css[nearClass] || that.dafaultCss);
                    } else {
                        that.logArr.push(that.dafaultCss);
                    }
                } else { // 可能为空字符串
                    that.result += '%c' + item;
                    that.logArr.push(that.dafaultCss);
                }
            });
        },
        findClass: function(o, c) { //通过两个标签数组[abc,bc]，找到多层标签时，内容所属的最近的并且没有结束的标签<b><a><b></b>abc</a></b>: abc属于a标签
            var open = o.slice(),close = c.slice();
            var lastClass = open.pop();
            var hasClose = close.indexOf(lastClass);
            while (lastClass && hasClose > -1) {
                lastClass = open.pop();
                close.splice(hasClose, 1);
                hasClose = close.indexOf(lastClass);
            }
            return lastClass
        },
        formatHumpName: function(name) {
            return name.replace(humpNameRe, function(res, g, G) {
                return g + '-' + G.toLowerCase()
            })
        },
        each: function(obj, cb) {
            if (typeof obj !== 'object') return;
            if(obj instanceof Array){
              for(var i=0;i<obj.length;i++){
                cb(obj[i],i,obj);
              }
              return
            }
            for(var k in obj){
              if(obj.hasOwnProperty(k)){
                cb(k, obj[k], obj)
              }
            }
        }
    }

    // expose
    function webChalk(template, config) {
      try {
        new WebChalk$1(template, config)
      } catch (e) {
        console.warn('error in WebChalk:', e)
      }
    }
    var base = {
      style: {
        tip: {
          color: '#ffffff',
          padding: '3px 7px',
          marginRight: '5px',
          borderRadius: '50%',
          lineHeight: '20px',
        },
        text: {
          padding: '3px 6px',
          margin: '3px 0 3px 0',
          lineHeight: '20px',
          borderRadius: '20px',
        }
      }
    }
    var preset = {
      log: function(log) {
        webChalk(log)
      },
      info: function(log) {
        log = '<tip>i</tip><text>' + log + '</text>'
        base.style.tip.background = 'rgb(32, 160, 255)'
        base.style.text.background = 'rgb(220, 240, 255)'
        webChalk(log, base)
      },
      warn: function(log) {
        log = '<tip>i</tip><text>' + log + '</text>'
        base.style.tip.background = 'rgb(245, 189, 0)'
        base.style.text.background = 'rgb(255, 251, 230)'
        webChalk(log, base)
      },
      error: function(log) {
        log = '<tip>i</tip><text>' + log + '</text>'
        base.style.tip.background = 'rgb(235, 57, 65)'
        base.style.text.background = 'rgb(251, 236, 236)'
        webChalk(log, base)
      }
    }

    for (var type in preset) {
      webChalk[type] = preset[type]
    }

    return webChalk
});
