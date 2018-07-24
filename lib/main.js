const DomNodeCollection = require('./dom_node_collection.js');


window.$i = (arg) => {
  switch (typeof arg) {
    case 'string':
      return getNodesFromDom(arg);
    case 'function':

    case 'object':
      if (arg === instanceOf HTMLElement) {
        argArr = Array.from(arg)
        return new DomNodeCollection(argArr);
      }

      break;
    default:

  }
}

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodeArr =  Array.from(nodes);
  return new DomNodeCollection(nodesArr);
}
