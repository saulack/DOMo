const DomNodeCollection = require('./dom_node_collection.js');


window.$i = (arg) => {
  switch (typeof arg) {
    case 'string':
      return getNodesFromDom(arg);
    case 'function':
    registerDocReadyCallback(arg)
    case 'object':
      if (arg === instanceOf HTMLElement) {
        argArr = Array.from(arg)
        return new DomNodeCollection(argArr);
      }
  }
}

$i.et


toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

registerDocReadyCallback = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
});
