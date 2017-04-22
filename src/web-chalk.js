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
    function WebChalk(template, cssObj, defaultCss) {
        if (typeof template !== 'string') {
            throw new Error('The first argument must be a string')
        }
        if (typeof cssObj !== 'object') {
            throw new Error('The second argument must be a object')
        }
        if (!(this instanceof WebChalk)) {
            return new WebChalk(template, cssObj, defaultCss)
        }
        if(this.isIE()){// ie
          template = template.replace(/<(\/?[a-zA-Z]+?)>/g,'');
          console.log(template);
          return;
        }
        if (!this.hasChildObject(cssObj)) {
            console.log('%c' + template, this.formatCss(cssObj));
            return;
        }
        this.str = template;
        this.css = cssObj || {};
        this.openTag = /</;
        this.classTag = /^([a-zA-Z]+?)>([\s\S]*)/;
        this.closeTag = /\/([a-zA-Z]+?)>([\s\S]*)/;
        this.result = '';
        this.logArr = [];
        this.dafaultCss = this.formatCss(defaultCss);
        this.init();
    }
    WebChalk.prototype = {
        init: function() {
            this.css = this.handleCss(this.css);
            this.handleTpl();
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
            var arr = that.str.split(that.openTag);
            if(arr.length === 1){ // 没有标签
              console.log('%c' + that.str, that.dafaultCss);
              return
            }
            var openClassAll = []; //所有的开标签
            var closeCloseAll = []; //所有的闭标签
            that.each(arr,function(item) {
                var openClass = item.match(that.classTag);
                var closeClose = item.match(that.closeTag);
                var className = '';
                var content;
                if (openClass) {
                    className = openClass[1];
                    openClassAll.push(className);
                    content = openClass[2]; //没有内容就是 ''
                    that.result += '%c' + content;
                    that.logArr.push(that.css[className] || that.dafaultCss);//没定义class按默认
                } else if (closeClose) {
                    className = closeClose[1];
                    closeCloseAll.push(className || that.dafaultCss);
                    content = closeClose[2]; //没有内容就是 ''
                    that.result += '%c' + content;
                    if (content != '') {
                        var nearClass = that.findClass(openClassAll, closeCloseAll);
                        that.logArr.push(that.css[nearClass] || that.dafaultCss);
                    } else {
                        that.logArr.push(that.dafaultCss);
                    }
                } else { // maybe a string in empty
                    that.result += '%c' + item;
                    that.logArr.push(that.dafaultCss);
                }
            });
            this.output();
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
        formatHumpName:function(name) {
            return name.replace(/([a-z])([A-Z])/, function(res, g, G) {
                return g + '-' + G.toLowerCase()
            })
        },
        each:function(obj, cb) {
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
        },
        hasChildObject:function(obj){//包含对象
          var isObject;
          this.each(obj,function(key,val){
            if(typeof val === 'object'){
              isObject = true;
            }
          })
          return isObject
        },
        isIE:function(){
          var ns = navigator.userAgent;
          if(/MSIE|TRIGENT/i.test(ns)){
            return true;
          }
          return false;
        }
    }

    return WebChalk
});
