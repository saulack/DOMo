const DomNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg){
  let elementArray;

  if (typeof arg === 'function') {
    if (!window.fnArr) {
      window.fnArr = [arg];
    } else {
      window.fnArr.push(arg);
    }
    if (document.readyState === "interactive" ||
    document.readyState === 'complete') {
      arg();
    } else {
      document.addEventListener("DOMContentLoaded", arg);
    }
  } else if (typeof arg === 'string') {
    const nodeList = document.querySelectorAll(arg);
    elementArray = Array.from(nodeList);
    return new DomNodeCollection(elementArray);

  } else if (arg.instanceof(HTMLElement)) {
    elementArray = Array.from(arg);
    return new DomNodeCollection(elementArray);
  }


};

window.$l.extend = function (...objects) {
  let firstObject = objects[0];
  for (var i = 1; i < objects.length; i++) {
    const keys = Object.keys(objects[i]);
    for (var j = 0; j < keys.length; j++) {
      firstObject[keys[j]] = objects[i][keys[j]];
    }
  }
  return firstObject;
};

window.$l.ajax = function (options) {

  const defaults = {
    success: () => {},
    error: () => {},
    url: window.location.href,
    method: 'GET',
    data: {},
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
    };

  window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);
  xhr.onload = function () {


  };
  xhr.send(defaults.data);
};
