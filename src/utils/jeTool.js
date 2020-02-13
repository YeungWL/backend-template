/*
 * @Name: JEUI Tools
 * @Author: chen guojun
 */
//常用公共JS工具
var je = new Object();

/* 去除两端空格 */
je.trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
je.isType = function (obj, type) {
  var firstUper = function (str) {
    str = str.toLowerCase();
    return str.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase();
    });
  };
  return Object.prototype.toString.call(obj) == "[object " + firstUper(type) + "]";
};
je.isObject = function (obj) {
  return je.isType(obj, "object");
};
je.isString = function (obj) {
  return je.isType(obj, "string");
};
je.isNumber = function (val) {
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  return (regPos.test(val) || regNeg.test(val)) ? true : false;
};
je.isFunction = function (obj) {
  return je.isType(obj, "function");
};
je.isArray = Array.isArray || function (obj) {
  return je.isType(obj, "array");
};
je.keys = Object.keys ? Object.keys : function (obj) {
  var res = [];
  for (var i in obj) if (obj.hasOwnProperty(i)) {
    res.push(i);
  }
  return res;
};
je.map = function (array, callback) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    res.push(callback(array[i], i));
  }
  return res;
};
/* 判断对象是否为空对象 */
je.isEmptyObject = function (obj) {
  for (var i in obj) {
    return false;
  }
  return true;
};
//判断在此数组中是否存在指定的
je.inArray = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return true;
  }
  return false;
};
/* 判断是否为移动端 */
je.isMobile = function () {
  var navMatch = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|JUC|WebOS|Windows Phone)/i;
  return navigator.userAgent.match(navMatch) ? true : false;
};
je.extend = function () {
  var options, name, copy, target = arguments[0], i = 1, length = arguments.length;
  if (typeof (target) === "boolean") {
    target = arguments[1] || {}
    i = 2;
  } else if (typeof (target) !== "object" && typeof (target) !== "function") {
    target = {};
  }
  if (length === i)--i;
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        copy = options[name];
        if (target === copy) continue;
        if (copy !== undefined) target[name] = copy;
      }
    }
  }
  return target;
};

// function extend(target, source) {
//   for (var key in source) {
//     var o = source[key];
//     if (o instanceof Array) {
//       target[key] = extend([], o);
//     } else if (o instanceof Object) {
//       target[key] = extend({}, o);
//     } else {
//       target[key] = o;
//     }
//   }
//   return target;
// }

je.UUID = function () {  //https://blog.csdn.net/weixin_40612082/article/details/81085892
  var s = [], hexDigits = "0123456789ABCDEFGHJKMNPQRSTUVWXY";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return 'JEUI-' + uuid;
}
je.randomCode = function (len) {
  // 用于盛放随机数码的空数组
  var lens = len || 8, result = [];
  // 长度为62的数码数组
  var arr = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ".split('');
  for (var i = 0; i < lens; i++) {
    // 用于随机获取arr中的元素，产生[0,62]之间的随机整数
    var num = Math.floor(Math.random() * arr.length);
    result.push(arr[num]);
  }
  return result.join('')
}

/* 保留小数点后N位 */
je.toDecimal = function (val, num) {
  num = num == undefined ? 2 : num;
  // 四舍五入
  var vals = Math.round(val * Math.pow(10, num)) / Math.pow(10, num),
    toVal = vals.toString(), len = toVal.indexOf('.');
  // 如果是整数，小数点位置为-1
  if (len < 0) {
    len = toVal.length;
    toVal += '.';
  }
  // 不足位数以零填充
  while (toVal.length <= len + num) {
    toVal += '0';
  }
  return toVal;
};
// 判断俩个数组是否相等
je.equals = function (original, array) {
  if (!array) return false;
  // 判断数组的长度是否相等
  if (original.length != array.length) return false;

  for (var i = 0, l = original.length; i < l; i++) {
    if (original[i] instanceof Array && array[i] instanceof Array) {
      if (!je.equals(original[i], array[i])) return false;
    } else if (original[i] != array[i]) {
      return false;
    }
  }
  return true;
};
// 判断俩个对象是否相等
je.objEqual = function (valOne, valTwo) {
  var ob1 = valOne instanceof Object, ob2 = valTwo instanceof Object;
  // 判断是不是对象
  if (!ob1 || !ob2) return valOne === valTwo;

  // 判断keys的长度是否相等
  if (Object.keys(valOne).length !== Object.keys(valTwo).length) return false;

  for (var k in valOne) {
    var vk1 = valOne[k] instanceof Object, vk2 = valTwo[k] instanceof Object;
    if (vk1 && vk2) {
      return je.objEqual(valOne[k], valTwo[k]);
    } else if (valOne[k] !== valTwo[k]) {
      return false;
    }
  }
  return true;
};
//判断两个对象或变量是否相等
je.isEqual = function (a, b) {
  //如果a和b本来就全等
  if (a === b) {
    //判断是否为0和-0
    return a !== 0 || 1 / a === 1 / b;
  }
  //判断是否为null和undefined
  if (a == null || b == null) {
    return a === b;
  }
  //接下来判断a和b的数据类型
  var classNameA = toString.call(a),
    classNameB = toString.call(b);
  //var classNameA = typeof(a), (兼容IE的写法)
  //classNameB = typeof(b);
  //如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false;
  }
  if (a instanceof Date) {
    classNameA = '[object Date]';
  }

  //如果数据类型相等，再根据不同数据类型分别判断
  switch (classNameA) {
    case '[object RegExp]':
    case '[object String]':
    case 'string':
      //进行字符串转换比较
      return '' + a === '' + b;
    case 'number':
    case '[object Number]':
      //判断是否为0或-0
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
    case 'boolean':
      return +a === +b;
  }
  //如果是对象类型
  if (classNameA == '[object Object]' || classNameA == 'object') {
    //获取a和b的属性长度
    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (var i = 0; i < propsA.length; i++) {
      var propName = propsA[i];
      //如果对应属性对应值不相等，则返回false
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
  //如果是数组类型
  if (classNameA == '[object Array]') {
    if (a.toString() == b.toString()) {
      return true;
    }
    return false;
  }
};
je.merge = (function () {
  var typeOf = function (input) {
    return ({}).toString.call(input).slice(8, -1).toLowerCase();
  },
    deepClone = function (input) {
      var output = input, type = typeOf(input), idx, size;
      if (type === 'array') {
        output = [];
        size = input.length;
        for (idx = 0; idx < size; ++idx) {
          output[idx] = deepClone(input[idx]);
        }
      } else if (type === 'object') {
        output = {};
        for (idx in input) {
          output[idx] = deepClone(input[idx]);
        }
      }
      return output;
    },
    merges = function (clone) {
      return merge(clone === true, false, arguments);
    };

  merges.recursive = function (clone) {
    return merge(clone === true, true, arguments);
  };

  function recursive(base, extend) {
    if (typeOf(base) !== 'object') return extend;
    for (var key in extend) {
      if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
        base[key] = recursive(base[key], extend[key]);
      } else {
        base[key] = extend[key];
      }
    }
    return base;
  }

  function merge(isClone, isRecursive, argv) {
    var result = argv[0], size = argv.length;
    if (isClone || typeOf(result) !== 'object') result = {};
    for (var idx = 0; idx < size; ++idx) {
      var item = argv[idx], type = typeOf(item);
      if (type !== 'object') continue;
      for (var key in item) {
        if (key === '__proto__') continue;
        var sitem = isClone ? deepClone(item[key]) : item[key];
        if (isRecursive) {
          result[key] = recursive(result[key], sitem);
        } else {
          result[key] = sitem;
        }
      }
    }
    return result;
  }
  return merges;
})();

/* je.each(arr,function(val,i){}) */
je.each = function (obj, callback /*, thisp*/) {
  if (typeof callback != "function") throw new TypeError(callback + ' is not a function');
  var len = obj.length, thisp = arguments[2];
  for (var i = 0; i < len; i++) {
    if (i in obj) callback.call(thisp, obj[i], i, obj);
  }
};
/* 添加样式名 */
je.addClass = function (elem, cls) {
  if (!elem) return;
  je.each(cls.split(" "), function (val, i) {
    elem.classList.add(val);
  });
};

/* 移除样式名 */
je.removeClass = function (elem, cls) {
  if (!elem) return;
  je.each(cls.split(" "), function (val, i) {
    elem.classList.remove(val);
  });
};

/* 是否含有CLASS */
je.hasClass = function (c, node) {
  if (!node || !node.className) return false;
  return node.className.indexOf(c) > -1;
};
/* 事件绑定 */
je.on = function (elem, type, callback) {
  if (elem.addEventListener) {
    elem.addEventListener(type, callback, false);
    return true;
  } else if (elem.attachEvent) {
    return elem.attachEvent("on" + type, callback);//IE5+
  }
};
je.off = function (elem, type, callback) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, callback, false);
    return true;
  } else if (elem.detachEvent) {
    return elem.detachEvent("on" + type, callback);//IE5+
  }
};
//滚动到预定位置加动画
je.scrollTop = function (el, from, to, duration, callback) {
  to = to || 0;
  duration = duration || 500
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  var difference = Math.abs(from - to), step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      typeof callback === 'function' && callback();
      return;
    }
    var d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }
    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(function () {
      scroll(d, end, step)
    });
  }

  scroll(from, to, step);
};
//补齐数位
je.digit = function (num) {
  return num < 10 ? "0" + (num | 0) : num;
};
// localStorage    sessionStorage
je.each(["locStore", "ssiStore"], function (val, i) {
  //localStorage生命周期是永久，除非用户清除localStorage信息，否则这些信息将永远存在。
  //sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。
  var Store = val == "locStore" ? window.localStorage : window.sessionStorage;
  je[val] = {
    // 获取
    get: function (key) {
      var value = Store.getItem(key);
      if (value === null) return false; // 如果不存在
      if (value && value.substring(0, 1) === "{" || value.substring(0, 1) === "[") { // 如果字符串符合对象或者数组基本特征
        value = JSON.parse(value); // 把字符串转为对象
      }
      return value;
    },
    // 设置
    set: function (key, value) {
      if (je.isObject(value) || je.isArray(value)) { // 如果是对象
        value = JSON.stringify(value);
      }
      Store.setItem(key, value);
    },
    // 删除项
    remove: function (key) {
      this.get(key) && Store.removeItem(key);
    },
    //  清空
    clear: function () {
      Store.clear(); // 清空本地存储
    }
  };
});

// 笛卡尔积算法，可用于商品 SKU 计算
// calcDescartes([[1,2,3],['a','b','c']])
je.calcDescartes = function (list) {
  return Array.prototype.reduce.call(list, function (col, set) {
    var res = []
    col.forEach(function (c) {
      set.forEach(function (s) {
        var arr = [].concat(Array.isArray(c) ? c : [c])
        arr.push(s)
        res.push(arr)
      })
    })
    return res
  }, [
    []
  ])
}
// 笛卡尔积算法2
je.groupDescartes = function (arr) {
  var result = [];
  //字符串形式填充数组
  for (var i = 0; i < arr[0].length; i++) {
    result.push(JSON.stringify(arr[0][i]));
  }
  //从下标1开始遍历二维数组
  for (var s = 1; s < arr.length; s++) {
    //使用临时遍历替代结果数组长度(这样做是为了避免下面的循环陷入死循环)
    var size = result.length;
    //根据结果数组的长度进行循环次数,这个数组有多少个成员就要和下一个数组进行组合多少次
    for (var j = 0; j < size; j++) {
      //遍历要进行组合的数组
      for (var k = 0; k < arr[s].length; k++) {
        //把组合的字符串放入到结果数组最后一个成员中
        //这里使用下标0是因为当这个下标0组合完毕之后就没有用了，在下面我们要移除掉这个成员
        var temp = result[0] + "," + JSON.stringify(arr[s][k]);
        result.push(temp);
      }
      //当第一个成员组合完毕，删除这第一个成员
      result.shift();
    }
  }
  //转换字符串为json对象
  for (var l = 0; l < result.length; l++) {
    result[l] = JSON.parse("[" + result[l] + "]");
  }
  return result;
}

window.je = je;
export default je;
