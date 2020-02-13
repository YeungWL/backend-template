import Vue from 'vue'
// 是否有权限
const hasPermission = function (vals, el) {
  // vals为空表示权限不被控制  
  if (vals == '') return;
  // 当前用户的所有权限列表
  let AllPermissions = sessionStorage.getItem("btnPermissions");
  let privilegeMap = JSON.parse(AllPermissions);
  // 是否有权限，默认是没有权限的  
  let hasFlag = false;
  if (AllPermissions == undefined || AllPermissions == null) {
    return false;
  }
  if (vals.indexOf("#") >= 0) {
    let privilegeKeyArray = vals.split("#");
    let length = privilegeKeyArray.length;
    // 是否有权限，默认是有权限的  
    hasFlag = true;
    for (let i = 0; i < length; i++) {
      // 如果某个资源没有权限，则其余的都没有权限  
      if (privilegeMap[vals] == undefined || privilegeMap[vals] == '') {
        hasFlag = false;
        break;
      }
    }
  } else if (vals.indexOf(",") >= 0) {
    // key 中有多个资源，当多个资源至少有一个有权限的时候，就能使用该权限 
    let privilegeKeyArray = vals.split(",");
    let length = privilegeKeyArray.length;
    for (let i = 0; i < length; i++) {
      let tempVals = privilegeKeyArray[i];
      // 如果某个资源没有权限，则其余的都没有权限  
      if (privilegeMap[tempVals] != undefined || privilegeMap[tempVals] != '') {
        hasFlag = true;
        break;
      }
    }
  } else {
    if (vals.indexOf(AllPermissions) > -1) {
      hasFlag = true;
    }
  }

  if (!hasFlag && el && el.nodeType === 1) {
    el.parentNode.removeChild(el);
  }
};

// 权限检查方法
Vue.prototype.$perhas = function (value, el) {
  hasPermission(value, el)
}
// 指令
Vue.directive('perhas', {
  bind: function (el, binding, vnode) {
    hasPermission(binding.value, el)
  }
});


